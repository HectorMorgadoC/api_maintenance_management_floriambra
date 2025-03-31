/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProcessService } from "./process.service";
import { ProcessController } from "./process.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Process } from "./entities/process.entity";

@Module({
    controllers: [ProcessController],
    providers: [ProcessService],
    imports: [TypeOrmModule.forFeature([Process])],
    exports: [ProcessService],
})
export class ProcessModule {}
