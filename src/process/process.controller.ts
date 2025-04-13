/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseUUIDPipe,
} from "@nestjs/common";
import { ProcessService } from "./process.service";
import { CreateProcessDto } from "./dto/create-process.dto";
import { UpdateProcessDto } from "./dto/update-process.dto";
import { Auth } from "src/users/decorators/auth.decorator";
import { AccessLevel } from "src/users/interfaces/access-level.inteface";


@Controller("process")
export class ProcessController {
    constructor(private readonly processService: ProcessService) {}

    @Post()
    @Auth(AccessLevel.admin)
    create(@Body() createProcessDto: CreateProcessDto) {
        return this.processService.create(createProcessDto);
    }

    @Get()
    @Auth(AccessLevel.admin)
    findAll() {
        return this.processService.findAll();
    }

    @Patch(":id")
    @Auth(AccessLevel.admin)
    update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProcessDto: UpdateProcessDto,
    ) {
        return this.processService.update(id, updateProcessDto);
    }

    // This driver is optional and must be verified for service.
    
    // @Delete(":id")
    // remove(@Param("id", ParseUUIDPipe) id: string) {
    //     return this.processService.remove(id);
    // }
}
