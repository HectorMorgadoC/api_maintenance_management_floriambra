/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { Auth } from "src/client/decorators/auth.decorator";
import { AccessLevel } from "src/client/interfaces/access-level.inteface";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller("report")
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @ApiOperation({ summary: 'Create a new report' })
    @ApiResponse({ status: 201, description: 'Report created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor,
        AccessLevel.technical)
    @Post()
    create(@Body() createReportDto: CreateReportDto) {
        return this.reportsService.create(createReportDto);
    }
    
    @ApiOperation({ summary: 'Get all reports with filters' })
    @ApiResponse({ status: 200, description: 'Return all reports.' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor,
        AccessLevel.technical)
    @Get()
    findWithFilters(@Query() _paginationDto: PaginationDto) {
        return this.reportsService.findWithFilters(_paginationDto);
    }

    @ApiOperation({ summary: 'Update a report' })
    @ApiParam({ name: 'id', description: 'Report ID' })
    @ApiResponse({ status: 200, description: 'Report updated successfully.' })
    @ApiResponse({ status: 404, description: 'Report not found.' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor)
    @Patch(":id")
    update(@Param("id" ,ParseUUIDPipe) id: string, @Body() updateReportDto: UpdateReportDto) {
        return this.reportsService.update(id, updateReportDto);
    }

    @ApiOperation({ summary: 'Update production approval status' })
    @ApiParam({ name: 'id', description: 'Report ID' })
    @ApiParam({ name: 'production_approval', description: 'Production approval status' })
    @ApiResponse({ status: 200, description: 'Production approval updated successfully.' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.production_supervisor)
    @Patch("/production_approval/:id/:production_approval")
    updateProductionAproval(
        @Param("id" ,ParseUUIDPipe ) id: string,
        @Param("production_approval", ParseBoolPipe) production_approval: boolean
    ) {
        return this.reportsService.updateProductionAproval(id, production_approval);
    }

    @ApiOperation({ summary: 'Update maintenance approval status' })
    @ApiParam({ name: 'id', description: 'Report ID' })
    @ApiParam({ name: 'maintenance_approval', description: 'Maintenance approval status' })
    @ApiResponse({ status: 200, description: 'Maintenance approval updated successfully.' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor)
    @Patch("/maintenance_approval/:id/:maintenance_approval")
    updateMaintenanceAproval(
        @Param("id" ,ParseUUIDPipe ) id: string,
        @Param("maintenance_approval", ParseBoolPipe) maintenance_approval: boolean
    ) {
        return this.reportsService.updateMaintenanceAproval(id,maintenance_approval);
    }

    @ApiOperation({ summary: 'Delete a report' })
    @ApiParam({ name: 'id', description: 'Report ID' })
    @ApiResponse({ status: 200, description: 'Report deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Report not found.' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor)
    @Delete(":id")
    remove(@Param("id" ,ParseUUIDPipe) id: string) {
        return this.reportsService.remove(id);
    }
}
