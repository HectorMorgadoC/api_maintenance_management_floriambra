/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { Report } from "./entities/report.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { OrdersService } from "src/orders/orders.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ClientService } from "src/client/client.service";
import { AccessLevel } from "src/client/interfaces/access-level.inteface";

@Injectable()
@ApiTags("Reports")
export class ReportsService {
    private readonly logger = new Logger(ReportsService.name);
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
        private readonly orderService: OrdersService,
        private readonly dataSourse: DataSource,
        @Inject(forwardRef(() => ClientService))
        private readonly clientService: ClientService
    ) {}

    @ApiOperation({ summary: "Create a new report" })
    @ApiResponse({ status: 201, description: "Report created successfully" })
    @ApiResponse({ status: 400, description: "Bad request" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async create(_createReportDto: CreateReportDto) {
        const newReport = _createReportDto;
        const clientRequest = await this.clientService.findOnePlain(newReport.client);

        if (
            clientRequest.access_level as AccessLevel != AccessLevel.technical &&
            clientRequest.access_level as AccessLevel != AccessLevel.technical_supervisor &&
            clientRequest.access_level as AccessLevel != AccessLevel.admin
        ) {
            throw new BadRequestException(`the client ${clientRequest.username} does not have an authorized role`);
        }

        try {
            const savedReport = await this.reportRepository.save(newReport as unknown as DeepPartial<Report>);
            const newRegisterReport = await this.reportRepository.findOne({
                where: { id: savedReport.id },
                relations: ["client", "order", "order.client", "order.team"]
            });

            if (!newRegisterReport) {
                throw new InternalServerErrorException("Error retrieving created order");
            }

            await this.orderService.updateStateOrder(true, newRegisterReport.order.id);

            return {
                id_report: newRegisterReport.id,
                id_order: newRegisterReport.order.id,
                description_fault: newRegisterReport.order.fault_description,
                order_creator: newRegisterReport.order.client.username,
                technical: newRegisterReport.client.username,
                team: newRegisterReport.order.team.name,
                notice_date: newRegisterReport.order.notice_date,
                from_date: newRegisterReport.from_date,
                end_date: newRegisterReport.end_date,
                summary_of_activities: newRegisterReport.summary_of_activities,
                used_spare_parts: newRegisterReport.used_spare_parts,
                remarks: newRegisterReport.remarks
            };
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Find reports with filters" })
    @ApiResponse({ status: 200, description: "Reports found successfully" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async findWithFilters(_paginationDto: PaginationDto) {
        const { team, client: client, date_time } = _paginationDto;

        const queryBuilder = this.reportRepository
            .createQueryBuilder("report")
            .leftJoinAndSelect("report.order", "order")
            .leftJoinAndSelect("report.client", "reportClient")
            .leftJoinAndSelect("order.team", "team")
            .leftJoinAndSelect("order.client", "orderClient");

        if (team) {
            queryBuilder.andWhere("team.id = :teamId", { teamId: team });
        }

        if (client) {
            queryBuilder.andWhere("reportClient.id = :ClientId", { ClientId: client });
        }

        if (date_time) {
            const dateObj = new Date(date_time);
            queryBuilder.andWhere("DATE(order.notice_date) = DATE(:date)", {
                date: dateObj.toISOString()
            });
        }

        const reports = await queryBuilder.getMany();

        return reports.map((report) => {
            return {
                id_report: report.id,
                id_order: report.order.id,
                description_fault: report.order.fault_description,
                order_creator: report.order.client.username,
                technical: report.client.username,
                collaborators: report.collaborators,
                team: report.order.team.name,
                notice_date: report.order.notice_date,
                from_date: report.from_date,
                end_date: report.end_date,
                fault_type: report.fault_type,
                type_of_maintenance: report.type_of_maintenance,
                summary_of_activities: report.summary_of_activities,
                used_spare_parts: report.used_spare_parts,
                remarks: report.remarks,
                maintenance_approval: report.maintenance_approval,
                production_approval: report.production_approval
            };
        });
    }

    @ApiOperation({ summary: "Find one report" })
    @ApiResponse({ status: 200, description: "Report found successfully" })
    @ApiResponse({ status: 404, description: "Report not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async findOnePlain(id: string) {
        try {
            return this.reportRepository.findOne({
                where: { id },
                relations: ["order", "client", "order.team", "order.client"]
            });
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Update a report" })
    @ApiResponse({ status: 200, description: "Report updated successfully" })
    @ApiResponse({ status: 404, description: "Report not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async update(id: string, _updateReportDto: UpdateReportDto) {
        const updatedReport = _updateReportDto;

        const existingReport = await this.reportRepository.findOne({ where: { id } });

        if (!existingReport) {
            throw new NotFoundException(`Report with id: ${id} not found`);
        }

        const reportPreload = await this.reportRepository.preload({
            id,
            ...updatedReport as DeepPartial<Report>
        });

        if (!reportPreload) {
            throw new NotFoundException(`Report with id: ${id} not found`);
        }

        const queryRunner = this.dataSourse.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(reportPreload);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            const updatedEquipment = await this.findOnePlain(id);

            if (!updatedEquipment) {
                throw new BadRequestException("Modified equipment request error");
            }

            return {
                id_report: updatedEquipment.id,
                id_order: updatedEquipment.order.id,
                description_fault: updatedEquipment.order.fault_description,
                order_creator: updatedEquipment.order.client.username,
                technical: updatedEquipment.client.username,
                collaborators: updatedEquipment.collaborators,
                team: updatedEquipment.order.team.name,
                notice_date: updatedEquipment.order.notice_date,
                from_date: updatedEquipment.from_date,
                end_date: updatedEquipment.end_date,
                fault_type: updatedEquipment.fault_type,
                type_of_maintenance: updatedEquipment.type_of_maintenance,
                summary_of_activities: updatedEquipment.summary_of_activities,
                used_spare_parts: updatedEquipment.used_spare_parts,
                remarks: updatedEquipment.remarks,
                maintenance_approval: updatedEquipment.maintenance_approval,
                production_approval: updatedEquipment.production_approval
            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Update production approval status" })
    @ApiResponse({ status: 200, description: "Production approval updated successfully" })
    @ApiResponse({ status: 304, description: "Report already approved by production" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async updateProductionAproval(id: string, production_approval: boolean) {
        const existingReport = await this.reportRepository.findOne({ where: { id } });

        if (!existingReport) {
            throw new NotFoundException(`Report with id: ${id} not found`);
        }

        if (existingReport.production_approval) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_MODIFIED,
                    message: "Report already approved by production"
                },
                HttpStatus.NOT_MODIFIED
            );
        }

        const reportPreload = await this.reportRepository.preload({
            id,
            production_approval
        });

        if (!reportPreload) {
            throw new NotFoundException(`Report with id: ${id} not found`);
        }

        try {
            await this.reportRepository.save(reportPreload);
            const updatedReport = await this.findOnePlain(id);

            if (!updatedReport) {
                throw new BadRequestException("Modified report request error");
            }

            return {
                maintenance_approval: updatedReport.maintenance_approval,
                production_approval: updatedReport.production_approval
            };
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Update maintenance approval status" })
    @ApiResponse({ status: 200, description: "Maintenance approval updated successfully" })
    @ApiResponse({ status: 304, description: "Report already approved by maintenance" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async updateMaintenanceAproval(id: string, maintenance_approval: boolean) {
        const existingReport = await this.reportRepository.findOne({ where: { id } });

        if (!existingReport) {
            throw new NotFoundException(`Report with id: ${id} not found`);
        }

        if (existingReport.maintenance_approval) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_MODIFIED,
                    message: "Report already approved by maintenance"
                },
                HttpStatus.NOT_MODIFIED
            );
        }

        const reportPreload = await this.reportRepository.preload({
            id,
            maintenance_approval
        });

        if (!reportPreload) {
            throw new NotFoundException(`Report with id: ${id} not found`);
        }

        try {
            await this.reportRepository.save(reportPreload);
            const updatedReport = await this.findOnePlain(id);

            if (!updatedReport) {
                throw new BadRequestException("Modified report request error");
            }

            return {
                maintenance_approval: updatedReport.maintenance_approval,
                production_approval: updatedReport.production_approval
            };
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Remove a report" })
    @ApiResponse({ status: 200, description: "Report removed successfully" })
    @ApiResponse({ status: 404, description: "Report not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async remove(id: string) {
        const report = await this.reportRepository.findOne({ where: { id } });

        if (!report) {
            throw new NotFoundException(`Report with id: ${id} not found`);
        }

        const query = this.reportRepository.createQueryBuilder("report");
        try {
            await query.delete().where("id = :id", { id }).execute();
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Remove reports for a client" })
    @ApiResponse({ status: 200, description: "Reports removed successfully" })
    @ApiResponse({ status: 404, description: "No reports found for client" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async removeForClient(id: string) {
        const reports = await this.reportRepository.find({
            where: { client: { id } }
        });

        if (!reports) {
            throw new NotFoundException(`No reports were found for user with ID: ${id}`);
        }

        try {
            await this.reportRepository.remove(reports);
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Remove reports for user order" })
    @ApiResponse({ status: 200, description: "Reports removed successfully" })
    @ApiResponse({ status: 404, description: "No reports found for user order" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async removeForIdClientOrder(id: string) {
        const reports = await this.reportRepository.find({
            where: {
                order: { client: { id } }
            },
            relations: ["order", "order.client"]
        });

        if (!reports) {
            throw new NotFoundException(`No report found for user with ID: ${id} and the specified order`);
        }

        try {
            await this.reportRepository.remove(reports);
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    private handleDbExceptions(error: any) {
        if (error.code === "23505") {
            throw new BadRequestException(error.detail);
        }

        if (error.code === "23503") {
            throw new BadRequestException(error.detail);
        }

        this.logger.error(error);
        throw new InternalServerErrorException("Unexpected error, check server logs");
    }
}
