/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Client } from "./entities/client.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { DataSource } from "typeorm";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login-user.dto";
import { AccessLevel } from "./interfaces/access-level.inteface";
import { ProcessService } from "src/process/process.service";
import { TeamService } from "src/team/team.service";
import { ReportsService } from "src/reports/reports.service";
import { OrdersService } from "src/orders/orders.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ClientResult } from "./interfaces/client-result";
import { UUID } from "crypto";

@ApiTags("Client")
@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,
        private readonly teamService: TeamService,
        private readonly processService: ProcessService,
        private readonly reportsService: ReportsService,
        private readonly ordersService: OrdersService
    ) { }

    @ApiOperation({ summary: "Login a client" })
    @ApiResponse({ status: 200, description: "Client logged in successfully" })
    @ApiResponse({ status: 401, description: "Invalid credentials" })
    async login(loginDto: LoginDto) {
        const { password, email } = loginDto;

        const client = await this.clientRepository.findOne({
            where: { email },
            select: {
                username: true,
                password: true,
                id: true,
                access_level: true,
                is_active: true,
                process: { name: true }
            },
            relations: ["process"]
        });

        if (!client) {
            throw new UnauthorizedException("Credentials are not valid (username)");
        }

        if (!bcrypt.compareSync(password, client.password)) {
            throw new UnauthorizedException("Credentials are not valid (password)");
        }

        if (!client.is_active) {
            throw new UnauthorizedException("Client is no longer enabled");
        }

        const payload: JwtPayload = {
            sub: client.id as UUID,
            access_level: client.access_level,
            process: client.process?.name,
        }
        const token = this.getJwtToken(payload);
        const teams = await this.teamService.findAll(client.access_level as AccessLevel);
        const process = await this.processService.findAll();
        const clients = await this.findAll();
        const clientResponse: ClientResult[] = [];

        clients.forEach(client => {
            if(client.access_level != AccessLevel.admin) {
                if(client.access_level === AccessLevel.technical || 
                    client.access_level === AccessLevel.technical_supervisor 
                ){
                    clientResponse.push({
                        id: client.id as UUID,
                        username: client.username,
                        process: client.process,
                        access_level: client.access_level
                    })
                } else {
                    clientResponse.push({
                    id: client.id as UUID,
                    username: client.username,
                    process: client.process,
                    })
                }
            } else {
                clientResponse.push({
                    id: client.id as UUID,
                    username: client.username,
                    process: client.process,
                    access_level: client.access_level
                })
            }
            
        });

        if (client.access_level === AccessLevel.admin) {
            return {
                client: {
                    id: client.id,
                    username: client.username,
                    access_level: client.access_level,
                    teams: teams,
                    process: process,
                    clients: clientResponse
                },
                token
            };
        }

        if (client.access_level === AccessLevel.production_supervisor) {
            return {
                client: {
                    id: client.id,
                    username: client.username,
                    access_level: client.access_level,
                    teams: teams,
                    clients: clientResponse
                },
                token
            };
        }

        if (client.access_level === AccessLevel.technical_supervisor) {
            return {
                client: {
                    id: client.id,
                    username: client.username,
                    access_level: client.access_level,
                    teams: teams,
                    clients: clientResponse
                },
                token
            };
        }   

        if (client.access_level === AccessLevel.operator) {
            if (!client.process) {
                return {
                    client: {
                        id: client,
                        username: client.username,
                        access_level: client.access_level,
                        team: [],
                        clients: []
                    },
                    token
                };
            } else {
                return {
                    client: {
                        id: client.id,
                        username: client.username,
                        access_level: client.access_level,
                        teams: teams?.filter(team => {
                            const teamProcess = team?.process;
                            if (client.process.name === teamProcess)
                                return {
                                    team
                                };
                        }),
                        clients:[]
                    },
                    token
                };
            }
        }

        return {
            client: {
                id: client,
                username: client.username,
                access_level: client.access_level,
                teams: teams,
                clients: clientResponse
            },
            token
        };
    }
    checkAuthStatus(client: Client) {
        return {
            username: client.username,
            access_level : client.access_level,
            process: client.process,
            token: this.getJwtToken( 
                { 
                    sub: client.id as UUID,
                    access_level: client.access_level,
                    process: client.process?.name
                } 
            )
        }
    }

    @ApiOperation({ summary: "Create a new client" })
    @ApiResponse({ status: 201, description: "Client created successfully" })
    @ApiResponse({ status: 400, description: "Bad request" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async create(_createUserDto: CreateClientDto) {
        try {
            const { password, ...rest } = _createUserDto as DeepPartial<Client>;
            const client = this.clientRepository.create(
                {
                    ...rest,
                    password: bcrypt.hashSync(password as string, 10),
                }
            );

            await this.clientRepository.save(client);
            return {
                username: client.username,
                access_level: client.access_level
            };
        } catch (error) {
            this.handleDBException(error);
        }
    }

    @ApiOperation({ summary: "Get all client" })
    @ApiResponse({ status: 200, description: "List of users retrieved successfully" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async findAll() {
        const client = await this.clientRepository.find({
            relations: ["process"]
        });
        const userReturn = client.map((user) => {
            if (!user.process) {
                return {
                    id: user.id,
                    username: user.username,
                    access_level: user.access_level,
                    email: user.email,
                    process: "unassigned"
                };
            }

            return {
                id: user.id,
                username: user.username,
                access_level: user.access_level,
                email: user.email,
                process: user.process.name
            };
        });
        return userReturn;
    }

    @ApiOperation({ summary: "Get a client by ID" })
    @ApiResponse({ status: 200, description: "Client retrieved successfully" })
    @ApiResponse({ status: 404, description: "Client not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async findOnePlain(id: string) {
        const client = await this.clientRepository.findOne({ where: { id }, relations: ["process"] });

        if (!client) {
            throw new NotFoundException(`Client with id: ${id} not found`);
        }

        if (!client.process) {
            return {
                id: client.id,
                username: client.username,
                access_level: client.access_level,
                email: client.email,
                process: "unassigned"
            };
        }

        return {
            id: client.id,
            username: client.username,
            access_level: client.access_level,
            email: client.email,
            process: client.process.name
        };
    }

    @ApiOperation({ summary: "Update a client by ID" })
    @ApiResponse({ status: 200, description: "Client updated successfully" })
    @ApiResponse({ status: 404, description: "Client not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async update(id: string, _updateUserDto: UpdateClientDto) {
        const { process, access_level, password,...rest } = _updateUserDto;

        const existingClient = await this.clientRepository.findOne({ where: { id }, relations: ["process"] });

        if (!existingClient) {
            throw new NotFoundException(`Client with id: ${id} not found`);
        }

        const userPreload = await this.clientRepository.preload({
            id,
            ...rest as DeepPartial<Client>,
            password: password && password.length > 0 ? bcrypt.hashSync(password, 10) : existingClient.password,
            process: process ? { id: process } : existingClient.process,
            access_level: access_level ? access_level : existingClient.access_level
        } as DeepPartial<Client>);

        if (!userPreload) {
            throw new NotFoundException(`Client with id: ${id} not found`);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(userPreload);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return await this.findOnePlain(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDBException(error);
        }
    }

    @ApiOperation({ summary: "Delete a client by ID" })
    @ApiResponse({ status: 200, description: "Client deleted successfully" })
    @ApiResponse({ status: 404, description: "Client not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async remove(idClient: string) {
        const { id } = await this.findOnePlain(idClient);
        const query = this.clientRepository.createQueryBuilder("client");

        if (!id) {
            throw new NotFoundException(`Client with id: ${id} not found`);
        }

        try {
            await this.reportsService.removeForClient(id);
            await this.reportsService.removeForIdClientOrder(id);
            await this.ordersService.removeForClient(id);
            await query.delete().where("id = :id", { id }).execute();
        } catch (error) {
            this.handleDBException(error);
        }
    }

    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }

    private handleDBException(error: any): never {
        if (error.code === "23505")
            throw new BadRequestException(error.detail);

        throw new InternalServerErrorException("Please check server logs");
    }
}   
