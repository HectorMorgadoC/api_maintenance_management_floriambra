/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { ProcessService } from "./process.service";
import { ProcessController } from "./process.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Process } from "./entities/process.entity";
import { UsersModule } from "src/users/users.module";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Process")
@Module({
    controllers: [ProcessController],
    providers: [ProcessService],
    imports: [
        TypeOrmModule.forFeature([Process]),
        forwardRef(() => UsersModule)
    ],
    exports: [ProcessService],
})
export class ProcessModule {}
