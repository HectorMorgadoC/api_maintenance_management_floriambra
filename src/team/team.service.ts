/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "./entities/team.entity";
import { AccessLevel } from "src/users/interfaces/access-level.inteface";

@Injectable()
export class TeamService {

    private readonly logger = new Logger(TeamService.name)
    constructor( 

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly dataSourse: DataSource
    ){}

    async create(_createTeamDto: CreateTeamDto) {
        const newTeam = this.teamRepository.create(_createTeamDto as unknown as DeepPartial<Team>);

        try {
            const newRegisterTeam = await this.teamRepository.save(newTeam)

            return {
                id: newRegisterTeam.id,
                name: newRegisterTeam.name,
                description: newRegisterTeam.description,
                march: newRegisterTeam.march ,
                model: newRegisterTeam.model ,
                working_voltage: newRegisterTeam.working_voltage,
                kilowatts: newRegisterTeam.kilowatts
            }
        } catch (error) {
            this.handleDbExceptions(error)
        }
    }

    async findAll( userAccessLevel: AccessLevel ) {
        try {
            const teams = await this.teamRepository.find({
                relations: ["process"]
            })

            if( userAccessLevel === AccessLevel.admin ) {
                return teams.map( team => {
                    if (!team.process) {
                        return {
                            id: team.id,
                            name: team.name,
                            status: team.is_active,
                            process: "unassigned"
                        }
                    }
                    return {
                        id: team.id,
                        name: team.name,
                        status: team.is_active,
                        process: team.process.name
                    }
                })
            }

            if( userAccessLevel === AccessLevel.production_supervisor || AccessLevel.operator ) {
                return teams.map( team => {
                    if (!team.process) {
                        return {
                            id: team.id,
                            name: team.name,
                            process: "unassigned"
                        }
                    }
                    if (team.process.is_active && team.is_active ) {
                        return {
                            id: team.id,
                            name: team.name,
                            process: team.process.name
                        }
                    }

                }). filter( team => team )
            }

        } catch (error) {
            this.handleDbExceptions(error)
        }
    }

    async findOnePlain(id: string) {
        try {
            return this.teamRepository.findOne({
                where: { id }, 
                relations: ["process"]
            })
        } catch (error) {
            this.handleDbExceptions(error)
        }
    }

    async update(id: string, _updateTeamDto: UpdateTeamDto) {
        const updatedTeam = _updateTeamDto;

        const existingTeam = await this.teamRepository.findOne({ where: { id } })

        if (!existingTeam) {
            throw new NotFoundException(`Team with id: ${id} not found`);
        }

        const teamPreload = await this.teamRepository.preload({
            id,
            ...updatedTeam as DeepPartial<Team>
        })

        if (!teamPreload) {
            throw new NotFoundException(`Team with id: ${id} not found`);
        }

        const queryRunner = this.dataSourse.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(teamPreload);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            const updatedEquipment =  await this.findOnePlain(id);

            if (!updatedEquipment) {
                throw new BadRequestException("Modified equipment request error")
            }

            if (!updatedEquipment.process) {
                
                return {
                    id: updatedEquipment.id,
                    name: updatedEquipment.name,
                    description: updatedEquipment.description,
                    march: updatedEquipment.march,
                    model: updatedEquipment.model,
                    working_voltage: updatedEquipment.working_voltage,
                    kilowatts: updatedEquipment.kilowatts,
                    process: "unassigned"
                };
            }

            return {
                id: updatedEquipment.id,
                name: updatedEquipment.name,
                description: updatedEquipment.description,
                march: updatedEquipment.march,
                model: updatedEquipment.model,
                working_voltage: updatedEquipment.working_voltage,
                kilowatts: updatedEquipment.kilowatts,
                process: updatedEquipment.process.name
            };
            
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDbExceptions(error);
        }

        
    }

    // The service to kill a teams is incomplete.
    // Warning: Relationships with other services will be taken into account.

    // async remove(id: string) {
    //     const team = await this.teamRepository.findOne({ where: { id } });
    //     
    //     if (!team) {
    //         throw new NotFoundException(`Team with id: ${id} not found`);
    //     }

    //     const query = this.teamRepository.createQueryBuilder('team');
    //     try {
    //         await query.delete().where("id = :id", { id }).execute();
    //     } catch (error) {
    //         this.handleDbExceptions(error);
    //     }
    // }

    private handleDbExceptions(error: any) {
        if (error.code === "23505") {
            throw new BadRequestException(error.detail);
        }

        if (error.code === "23503") {
            throw new BadRequestException(error.detail);
        }

        this.logger.error(error);
        throw new InternalServerErrorException("Unexpected error, check server logs");
    }

}
