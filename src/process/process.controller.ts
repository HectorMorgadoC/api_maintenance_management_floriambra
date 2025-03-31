/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
} from "@nestjs/common";
import { ProcessService } from "./process.service";
import { CreateProcessDto } from "./dto/create-process.dto";
import { UpdateProcessDto } from "./dto/update-process.dto";

@Controller("process")
export class ProcessController {
    constructor(private readonly processService: ProcessService) {}

  @Post()
    create(@Body() createProcessDto: CreateProcessDto) {
        return this.processService.create(createProcessDto);
    }

  @Get()
  findAll() {
      return this.processService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
      return this.processService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateProcessDto: UpdateProcessDto,
  ) {
      return this.processService.update(id, updateProcessDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
      return this.processService.remove(id);
  }
}
