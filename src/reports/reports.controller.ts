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
    Query,
    ParseBoolPipe,
} from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller("report")
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post()
    create(@Body() createReportDto: CreateReportDto) {
        return this.reportsService.create(createReportDto);
    }
    
    @Get()
    findWithFilters(@Query() _paginationDto: PaginationDto) {
        return this.reportsService.findWithFilters(_paginationDto);
    }

    @Patch(":id")
    update(@Param("id" ,ParseUUIDPipe) id: string, @Body() updateReportDto: UpdateReportDto) {
        return this.reportsService.update(id, updateReportDto);
    }

    @Patch("/production_approval/:id/:production_approval")
    updateProductionAproval(
        @Param("id" ,ParseUUIDPipe ) id: string,
        @Param("production_approval", ParseBoolPipe) production_approval: boolean
    ) {
        return this.reportsService.updateProductionAproval(id, production_approval);
    }

    @Patch("/maintenance_approval/:id/:maintenance_approval")
    updateMaintenanceAproval(
        @Param("id" ,ParseUUIDPipe ) id: string,
        @Param("maintenance_approval", ParseBoolPipe) maintenance_approval: boolean
    ) {
        return this.reportsService.updateMaintenanceAproval(id,maintenance_approval);
    }

    @Delete(":id")
    remove(@Param("id" ,ParseUUIDPipe) id: string) {
        return this.reportsService.remove(id);
    }
}
