/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { ProcessService } from "./process.service";
import { ProcessController } from "./process.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Process } from "./entities/process.entity";
import { ClientModule } from "src/client/client.module";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Process")
@Module({
    controllers: [ProcessController],
    providers: [ProcessService],
    imports: [
        TypeOrmModule.forFeature([Process]),
        forwardRef(() => ClientModule)
    ],
    exports: [ProcessService],
})
export class ProcessModule {}
