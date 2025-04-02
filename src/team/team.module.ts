/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./entities/team.entity";
import { ProcessModule } from "src/process/process.module";

@Module({
    controllers: [TeamController],
    providers: [TeamService],
    imports: [TypeOrmModule.forFeature([Team]), ProcessModule],
    exports: [ TeamModule ]
})
export class TeamModule {}
