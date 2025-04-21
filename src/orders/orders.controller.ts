/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
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
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { Auth } from "src/client/decorators/auth.decorator";
import { AccessLevel } from "src/client/interfaces/access-level.inteface";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller("order")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.operator,
        AccessLevel.production_supervisor,
        AccessLevel.technical_supervisor)
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @ApiOperation({ summary: 'Get all orders with filters' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: "Bad Request." })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.operator,
        AccessLevel.production_supervisor,
        AccessLevel.technical_supervisor,
        AccessLevel.technical)
    @Get()
    findWithFilters(@Query() _paginationDto: PaginationDto) {
        return this.ordersService.findWithFilters(_paginationDto);
    }

    @ApiOperation({ summary: 'Update an order' })
    @ApiResponse({ status: 200, description: 'Order updated successfully' })
    @ApiResponse({ status: 400, description: "Bad Request." })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    @ApiResponse({ status: 404, description: 'Order not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.production_supervisor,
        AccessLevel.technical_supervisor)
    @Patch(":id")
    update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ) {
        return this.ordersService.update(id, updateOrderDto);
    }

    @ApiOperation({ summary: 'Delete an order' })
    @ApiResponse({ status: 200, description: 'Order deleted successfully' })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    @ApiResponse({ status: 404, description: 'Order not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Auth(
        AccessLevel.admin,
        AccessLevel.production_supervisor,
        AccessLevel.technical_supervisor)
    @Delete(":id")
    remove(@Param("id", ParseUUIDPipe) id: string) {
        return this.ordersService.remove(id);
    }
}
