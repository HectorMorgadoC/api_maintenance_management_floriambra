/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { CreateProcessDto } from "./dto/create-process.dto";
import { UpdateProcessDto } from "./dto/update-process.dto";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { Process } from "./entities/process.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Processes")
@Injectable()
export class ProcessService {
    private readonly logger = new Logger(ProcessService.name);
    constructor(
        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>,
        private readonly dataSource: DataSource
    ) {}

    @ApiOperation({ summary: "Create a new process" })
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 400, description: "Bad Request." })
    @ApiResponse({ status: 500, description: "Internal Server Error." })
    async create(_createProcessDto: CreateProcessDto) {
        const newProcess = this.processRepository.create(_createProcessDto as DeepPartial<Process>);

        try {
            const newRegisterProcess = await this.processRepository.save(newProcess);

            return {
                id: newRegisterProcess.id,
                name: newRegisterProcess.name,
                description: newRegisterProcess.description
            };
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Retrieve all processes" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 500, description: "Internal Server Error." })
    async findAll() {
        try {
            const processes = await this.processRepository.find();

            return processes.map((process) => {
                return {
                    id: process.id,
                    name: process.name,
                    description: process.description,
                    is_actived: process.is_active
                };
            });
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Retrieve a process by ID" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: "Process not found." })
    @ApiResponse({ status: 500, description: "Internal Server Error." })
    async findOnePlain(id: string) {
        const process = await this.processRepository.findOne({ where: { id } });

        if (!process) {
            throw new NotFoundException(`Process with id: ${id} not found`);
        }

        return {
            name: process.name,
            description: process.description
        };
    }

    @ApiOperation({ summary: "Update a process by ID" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: "Process not found." })
    @ApiResponse({ status: 500, description: "Internal Server Error." })
    async update(id: string, _updateProcessDto: UpdateProcessDto) {
        const { is_actived, ...updatedProcess } = _updateProcessDto;

        const existingProcess = await this.processRepository.findOne({ where: { id } });

        if (!existingProcess) {
            throw new NotFoundException(`Process with id: ${id} not found`);
        }

        const processPreload = await this.processRepository.preload({
            id,
            ...updatedProcess as DeepPartial<Process>,
            is_active: is_actived
        });

        if (!processPreload) {
            throw new NotFoundException(`Process with id: ${id} not found`);
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(processPreload);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return await this.findOnePlain(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDbExceptions(error);
        }

        return processPreload;
    }

    private handleDbExceptions(error: any) {
        if (error.code === "23505") {
            throw new BadRequestException(error.detail);
        }

        this.logger.error(error);
        throw new InternalServerErrorException("Unexpected error, check server logs");
    }
}
