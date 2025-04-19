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
import { Auth } from "src/users/decorators/auth.decorator";
import { AccessLevel } from "src/users/interfaces/access-level.inteface";

@Controller("report")
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor,
        AccessLevel.technical)
    @Post()
    create(@Body() createReportDto: CreateReportDto) {
        return this.reportsService.create(createReportDto);
    }
    
    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor,
        AccessLevel.technical)
    @Get()
    findWithFilters(@Query() _paginationDto: PaginationDto) {
        return this.reportsService.findWithFilters(_paginationDto);
    }

    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor)
    @Patch(":id")
    update(@Param("id" ,ParseUUIDPipe) id: string, @Body() updateReportDto: UpdateReportDto) {
        return this.reportsService.update(id, updateReportDto);
    }

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

    @Auth(
        AccessLevel.admin,
        AccessLevel.technical_supervisor)
    @Delete(":id")
    remove(@Param("id" ,ParseUUIDPipe) id: string) {
        return this.reportsService.remove(id);
    }
}
