/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientService } from "src/client/client.service";
import { TeamService } from "src/team/team.service";
import { AccessLevel } from "src/client/interfaces/access-level.inteface";
import { StatusOrder } from "./interface/status-order";

@ApiTags("Orders")
@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly dataSourse: DataSource,
        @Inject(forwardRef(() => ClientService))
        private readonly clientService: ClientService,
        private readonly teamService: TeamService
    ) {}

    @ApiOperation({ summary: "Create a new order" })
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 400, description: "Bad request" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async create(_createOrderDto: CreateOrderDto) {
        const client = await this.clientService.findOnePlain(_createOrderDto.client);
        const team = await this.teamService.findOnePlain(_createOrderDto.team);
        const { notice_date, ...createOrderDto } = _createOrderDto;
        const id = await this.generateUniqueCode(new Date(notice_date));

        if (client.access_level as AccessLevel === AccessLevel.operator) {
            if (client.process !== team?.process.name) {
                throw new BadRequestException("[Client] Client does not belong to the process");
            }
        }

        const newOrder = this.orderRepository.create({
            ...createOrderDto as DeepPartial<Order>,
            id: id,
            notice_date: notice_date
        });

        try {
            const savedOrder = await this.orderRepository.save(newOrder);

            if (!team?.is_active) {
                throw new BadRequestException("[Team]: Team is not active");
            }

            const newRegisterOrder = await this.orderRepository.findOne({
                where: { id: savedOrder.id },
                relations: ["client", "team", "team.process"]
            });

            if (!newRegisterOrder) {
                throw new InternalServerErrorException("Error retrieving created order");
            }

            if (!newRegisterOrder.team.process) {
                return {
                    id: newRegisterOrder.id,
                    date: newRegisterOrder.notice_date,
                    client: newRegisterOrder.client.username,
                    process: "unassigned",
                    team: newRegisterOrder.team.name,
                    description: newRegisterOrder.fault_description,
                    order_state: newRegisterOrder.order_state,
                    observation: newRegisterOrder.observation
                };
            }

            return {
                id: newRegisterOrder.id,
                date: newRegisterOrder.notice_date,
                client: newRegisterOrder.client.username,
                process: newRegisterOrder.team.process.name,
                team: newRegisterOrder.team.name,
                description: newRegisterOrder.fault_description,
                order_state: newRegisterOrder.order_state,
                observation: newRegisterOrder.observation
            };
        } catch (error) {
            this.handleDbExceptions(error);
        }

        return _createOrderDto;
    }

    @ApiOperation({ summary: "Find orders with filters" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: "Bad request" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async findWithFilters(_paginationDto: PaginationDto) {
        const { team, client: client, date_time, order_state } = _paginationDto;

        if (!team && !client && !date_time && !order_state) {
            return [];
        }

        const queryBuilder = this.orderRepository.createQueryBuilder("order")
            .leftJoinAndSelect("order.team", "team")
            .leftJoinAndSelect("order.client", "client")
            .leftJoinAndSelect("team.process", "process")
            .where("1=1");

        if (order_state) {
            queryBuilder.andWhere("order.order_state = :order_state", { order_state });
        }

        if (team) {
            queryBuilder.andWhere("team.id = :teamId", { teamId: team });
        }

        if (client) {
            queryBuilder.andWhere("client.id = :clientId", { clientId: client });
        }

        if (date_time) {
            const dateObj = new Date(date_time);
            queryBuilder.andWhere("DATE(order.notice_date) = DATE(:date)", {
                date: dateObj.toISOString()
            });
        }

        const orders = await queryBuilder.getMany();

        return orders.map(order => {
            if (!order.team.process) {
                return {
                    id: order.id,
                    date: order.notice_date,
                    description: order.fault_description,
                    state: order.order_state,
                    client: order.client.username,
                    team: "unassigned",
                    observation: order.observation
                };
            }

            return {
                id: order.id,
                date: order.notice_date,
                description: order.fault_description,
                state: order.order_state,
                client: order.client.username,
                team: order.team.name,
                observation: order.observation
            };
        });
    }

    @ApiOperation({ summary: "Find one order by id" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: "Order not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async findOnePlain(id: string) {
        try {
            return this.orderRepository.findOne({
                where: { id: id },
                relations: ["team", "client", "team.process"]
            });
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Find one order by id" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: "Order not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async findOneOrderByCode(id: string) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: id },
                relations: ["team", "client", "team.process"]
            });
            if(!order) {
                throw new NotFoundException(`Order with id: ${id} not found`)
            }

            if(order.order_state != StatusOrder.done) {
                return {
                    id: order?.id,
                    team: order?.team.id,
                    client: order?.client.id,
                    fault_description: order.fault_description
                }
            } else {
                return {}
            }
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Update an order" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: "Order not found" })
    @ApiResponse({ status: 400, description: "Bad request" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async update(id: string, _updateOrderDto: UpdateOrderDto) {
        const { notice_date, ...res } = _updateOrderDto;
        const existingOrder = await this.orderRepository.findOne({ where: { id: id } });

        if (!existingOrder) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }

        const orderPreload = await this.orderRepository.preload({
            id: id,
            notice_date: notice_date ? notice_date : existingOrder.notice_date,
            ...res as DeepPartial<Order>
        });

        if (!orderPreload) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }

        const queryRunner = this.dataSourse.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(orderPreload);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            const updatedEquipment = await this.findOnePlain(id);

            if (!updatedEquipment) {
                throw new BadRequestException("Modified equipment request error");
            }

            if (!updatedEquipment.team.process) {
                return {
                    id: updatedEquipment.id,
                    client: updatedEquipment.client.username,
                    description: updatedEquipment.fault_description,
                    team: updatedEquipment.team.name,
                    notice_date: updatedEquipment.notice_date,
                    process: "unassigned",
                    order_state: updatedEquipment.order_state,
                    observation: updatedEquipment.observation
                };
            }

            return {
                id: updatedEquipment.id,
                client: updatedEquipment.client.username,
                description: updatedEquipment.fault_description,
                team: updatedEquipment.team.name,
                notice_date: updatedEquipment.notice_date,
                process: updatedEquipment.team.process.name,
                order_state: updatedEquipment.order_state,
                observation: updatedEquipment.observation
            };

        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Update order state" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: "Order not found" })
    @ApiResponse({ status: 304, description: "Order already closed" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async updateStateOrder(order_state: StatusOrder, id: string) {
        const existingOrder = await this.orderRepository.findOne({ where: { id: id } });

        if (!existingOrder) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }

        // if (existingOrder.order_state) {
        //     throw new HttpException(
        //         {
        //             statusCode: HttpStatus.NOT_MODIFIED,
        //             message: "Closed order"
        //         },
        //         HttpStatus.NOT_MODIFIED
        //     );
        // }

        const reportPreload = await this.orderRepository.preload({
            id: id,
            order_state
        });

        if (!reportPreload) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }

        try {
            await this.orderRepository.save(reportPreload);
            const updatedReport = await this.findOnePlain(id);

            if (!updatedReport) {
                throw new BadRequestException("Modified order request error");
            }

            return {
                order_state: updatedReport.order_state
            };
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Remove an order" })
    @ApiResponse({ status: 200, description: "Order removed successfully" })
    @ApiResponse({ status: 404, description: "Order not found" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async remove(id: string) {
        const order = await this.orderRepository.findOne({ where: { id: id } });

        if (!order) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }

        const query = this.orderRepository.createQueryBuilder("order");
        try {
            await query.delete().where("id = :id", { id: id }).execute();
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }

    @ApiOperation({ summary: "Remove orders for user" })
    @ApiResponse({ status: 200, description: "Orders removed successfully" })
    @ApiResponse({ status: 404, description: "No orders found for user" })
    @ApiResponse({ status: 500, description: "Internal server error" })
    async removeForClient(id: string) {
        const orders = await this.orderRepository.find({
            where: { client: { id } }
        });

        if (!orders) {
            throw new NotFoundException(`No orders were found for user with ID: ${id}`);
        }

        try {
            await this.orderRepository.remove(orders);
        } catch (error) {
            this.handleDbExceptions(error);
        }
    }


    async generateUniqueCode(date: Date): Promise<string> {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const datePrefix = `${day}${month}${year}`

        const startOfDay = new Date(date);
        startOfDay.setHours(0,0,0,0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23,59,59,999);

        const lastOrderOfDay = await this.orderRepository
            .createQueryBuilder('order')
            .where('order.notice_date >= :startOfDay',{ startOfDay})
            .andWhere('order.notice_date <= :endOfDay',{ endOfDay})
            .andWhere('order.id LIKE :prefix', { prefix: `${datePrefix}-%`})
            .orderBy('order.id', 'DESC')
            .getOne()

        let nextNumber = 1;

        if (lastOrderOfDay) {
            const codeParts = lastOrderOfDay.id.split('-');

            if ( codeParts.length === 2) {
                const lastNumber = parseInt(codeParts[1])
                nextNumber = lastNumber + 1
            }
        }

        const formattedNumber = String(nextNumber).padStart(3,'0');
        const finalCode = `${datePrefix}-${formattedNumber}`;
        return finalCode
    }

    private handleDbExceptions(error: any) {

        if(error.status === 404 ){
            throw new NotFoundException(error.message)
        }

        if (error.status === 400) {
            throw new BadRequestException(error.message);
        }

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
