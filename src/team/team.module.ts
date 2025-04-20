/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./entities/team.entity";
import { ProcessModule } from "src/process/process.module";
import { UsersModule } from "src/users/users.module";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Teams')
@Module({
    controllers: [TeamController],
    providers: [TeamService],
    imports: [
        TypeOrmModule.forFeature([Team]), 
        ProcessModule,
        forwardRef(() => UsersModule )
    ],
    exports: [ TeamService ]
})
export class TeamModule {}
