/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateProcessDto } from "./dto/create-process.dto";
import { UpdateProcessDto } from "./dto/update-process.dto";
import { DeepPartial, Repository } from "typeorm";
import { Process } from "./entities/process.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProcessService {

    private readonly logger = new Logger(ProcessService.name)
    constructor(

        @InjectRepository(Process)
        private readonly processRepository: Repository<Process>
    
    ){}


    async create(_createProcessDto: CreateProcessDto) {

        const newProcess = this.processRepository.create( _createProcessDto as DeepPartial<Process>);

        try {

            await this.processRepository.save(newProcess);  
            
        } catch (error) {

            this.handleDbExceptions( error )
        }
        
        return newProcess
    }

    async findAll() {
        return await this.processRepository.find() 
    }

    findOne(id: string) {
        return `This action returns a #${id} process`;
    }

    update(id: string, _updateProcessDto: UpdateProcessDto) {
        return `This action updates a #${id} process`;
    }

    remove(id: string) {
        return `This action removes a #${id} process`;
    }

    private handleDbExceptions(error: any) {
        if (error.code === "23505") {
            throw new BadRequestException(error.detail);
        }

        this.logger.error(error);
        throw new InternalServerErrorException("Unexpected error, check server logs");
    }
}
