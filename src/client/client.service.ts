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
import * as bcrypt from 'bcrypt';
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


@ApiTags('Users')
@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly userRepository: Repository<Client>,

        private readonly dataSource: DataSource,

        private readonly jwtService: JwtService,

        private readonly teamService: TeamService,

        private readonly processService: ProcessService,

        private readonly reportsService: ReportsService,

        private readonly ordersService: OrdersService
    ) {}
    

    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(loginDto: LoginDto) {
      const { password, username } = loginDto;


      const user = await this.userRepository.findOne({
        where: { username },
        select: { 
          username: true, 
          password: true, 
          id: true, 
          access_level: true,
          is_active: true, 
          process: { name: true } 
        },
        relations:["process"]
      });

      if (!user) {
        throw new UnauthorizedException('Credentials are not valid (username)');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credentials are not valid (password)');
      }

      if (!user.is_active) {
        throw new UnauthorizedException('User is no longer enabled');
      }

      const token = this.getJwtToken({ access_level: user.access_level, process: user.process?.name, username: user.username });

      const teams = await this.teamService.findAll(user.access_level as AccessLevel)
      const process = await this.processService.findAll()

      
      if ( user.access_level === AccessLevel.admin ) {
        return {
          user: {
            username: user.username,
            access_level: user.access_level,
            teams: teams,
            process: process
          },
          token
        };
      }

      if ( user.access_level === AccessLevel.production_supervisor ) {
        return {
          user: {
            username: user.username,
            access_level: user.access_level,
            teams: teams,
          },
          token
        };
      }

      if ( user.access_level === AccessLevel.technical_supervisor ) {
        return {
          user: {
            username: user.username,
            access_level: user.access_level,
            teams: teams,
          },
          token
        };
      }


      if ( user.access_level === AccessLevel.operator ) {
        if ( !user.process ) {
          return {
            user: {
              username: user.username,
              access_level: user.access_level,
              team: []
            },
            token
          }
          
        } else {
          return {
            user: {
              username: user.username,
              access_level: user.access_level,
              team: teams?.filter( team => {
                const teamProcess = team?.process
                if ( user.process.name === teamProcess )
                return {
                  team
                }
              })
            },
            token          
          }
        }
      }

      return {
        user: {
          username: user.username,
          access_level: user.access_level,
        },
        token
      }
    }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async create(_createUserDto: CreateClientDto) {
        
        try {
            const { password, ...rest } = _createUserDto as DeepPartial<Client>;
            const user = this.userRepository.create(
                {
                ...rest,
                    password: bcrypt.hashSync( password as string, 10 ),
                }
            );
            
            await this.userRepository.save(user);
            return {
                username: user.username,
                access_level: user.access_level
            };
        } catch (error) {
            this.handleDBException( error );
        }
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users retrieved successfully' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAll() {
        const user = await this.userRepository.find({
            relations: ["process"]
        });
        const userReturn = user.map( ( user ) => {
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

    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findOnePlain(id: string) {
        const user = await this.userRepository.findOne({ where: { id }, relations: ["process"] });

        if (!user) {
            throw new NotFoundException(`User with id: ${id} not found`);
        }

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
    }

    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async update(id: string, _updateUserDto: UpdateClientDto) {
        const { process, access_level,...rest } = _updateUserDto;
        
        const existingUser = await this.userRepository.findOne({ where: { id }, relations: ["process"] });

        if (!existingUser) {
          throw new NotFoundException(`User with id: ${id} not found`);
        }

        const userPreload = await this.userRepository.preload( { 
          id,
          ...rest as DeepPartial<Client>,
          process: process ? { id: process } : existingUser.process,
          access_level: access_level ? access_level : existingUser.access_level
        } as DeepPartial<Client>);

        if (!userPreload) {
            throw new NotFoundException(`User with id: ${id} not found`);
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
            this.handleDBException( error );
        } 
        
    }

    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async remove(idUser: string) {

        const { id } = await this.findOnePlain( idUser )
        const query = this.userRepository.createQueryBuilder('user');

        if (!id ) {
          throw new NotFoundException(`User with id: ${id} not found`)
        }

        try {

          await this.reportsService.removeForUser( id )

          await this.reportsService.removeForIdUserOrder( id )
  
          await this.ordersService.removeForClient( id )

          await query.delete().where("id = :id", { id }).execute();

        } catch (error) {
          this.handleDBException( error )
        }
        
    }

    private getJwtToken( payload: JwtPayload ) {
      const token = this.jwtService.sign( payload );
      return token
    }
  

    private handleDBException( error: any ): never {
    
        if ( error.code === '23505' )
            throw new BadRequestException( error.detail );

        console.log(error)

        throw new InternalServerErrorException('Please check server logs')
    }

}
