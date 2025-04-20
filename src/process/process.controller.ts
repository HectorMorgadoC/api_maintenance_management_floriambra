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
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProcessService } from "./process.service";
import { CreateProcessDto } from "./dto/create-process.dto";
import { UpdateProcessDto } from "./dto/update-process.dto";
import { Auth } from "src/users/decorators/auth.decorator";
import { AccessLevel } from "src/users/interfaces/access-level.inteface";

@ApiTags("process")
@Controller("process")
export class ProcessController {
    constructor(private readonly processService: ProcessService) {}

    @Post()
    @Auth(AccessLevel.admin)
    @ApiOperation({ summary: "Create a new process" })
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 400, description: "Bad Request." })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    create(@Body() createProcessDto: CreateProcessDto) {
        return this.processService.create(createProcessDto);
    }

    @Get()
    @Auth(AccessLevel.admin)
    @ApiOperation({ summary: "Obtener todos los procesos" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    findAll() {
        return this.processService.findAll();
    }

    @Patch(":id")
    @Auth(AccessLevel.admin)
    @ApiOperation({ summary: "Actualizar un proceso por ID" })
    @ApiResponse({ status: 200, description: "Proceso actualizado exitosamente." })
    @ApiResponse({ status: 404, description: "Proceso no encontrado." })
    @ApiResponse({ status: 403, description: "Acceso denegado." })
    update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateProcessDto: UpdateProcessDto,
    ) {
        return this.processService.update(id, updateProcessDto);
    }

    // Este método está comentado, pero puedes agregar Swagger si decides habilitarlo.
    // @Delete(":id")
    // @ApiOperation({ summary: "Eliminar un proceso por ID" })
    // @ApiResponse({ status: 200, description: "Proceso eliminado exitosamente." })
    // @ApiResponse({ status: 404, description: "Proceso no encontrado." })
    // remove(@Param("id", ParseUUIDPipe) id: string) {
    //     return this.processService.remove(id);
    // }
}
