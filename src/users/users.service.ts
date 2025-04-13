/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
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


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly dataSource: DataSource,

        private readonly jwtService: JwtService,

        private readonly teamService: TeamService,

        private readonly processService: ProcessService,

        private readonly reportsService: ReportsService,

        private readonly ordersService: OrdersService
    ) {}
    

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


      if ( user.access_level === AccessLevel.operator ) {
        if ( !user.process ) {
          return {
            user: {
              username: user.username,
              access_level: user.access_level,
              teams: []
            },
            token
          }
          
        } else {
        return {
          user: {
            username: user.username,
            access_level: user.access_level,
            teams: teams?.filter( team => {
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

    async create(_createUserDto: CreateUserDto) {
        
        try {
            const { password, ...rest } = _createUserDto as DeepPartial<User>;
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

    async update(id: string, _updateUserDto: UpdateUserDto) {
        const { process, access_level,...rest } = _updateUserDto;
        
        const existingUser = await this.userRepository.findOne({ where: { id }, relations: ["process"] });

        if (!existingUser) {
          throw new NotFoundException(`User with id: ${id} not found`);
        }

        const userPreload = await this.userRepository.preload( { 
          id,
          ...rest as DeepPartial<User>,
          process: process ? { id: process } : existingUser.process,
          access_level: access_level ? access_level : existingUser.access_level
        } as DeepPartial<User>);

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

    async remove(idUser: string) {

        const { id } = await this.findOnePlain( idUser )
        const query = this.userRepository.createQueryBuilder('user');

        if (!id ) {
          throw new NotFoundException(`User with id: ${id} not found`)
        }

        try {

          await this.reportsService.removeForUser( id )

          await this.reportsService.removeForIdUserOrder( id )
  
          await this.ordersService.removeForUser( id )

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
