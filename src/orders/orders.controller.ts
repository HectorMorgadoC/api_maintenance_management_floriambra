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

@Controller("order")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
        create(@Body() createOrderDto: CreateOrderDto) {
            return this.ordersService.create(createOrderDto);
        }

    @Get()
    findOne(@Query() _paginationDto: PaginationDto) {
        console.log(_paginationDto.date_time);
        return this.ordersService.findWithFilters(_paginationDto);
    }

    @Patch(":id")
    update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ) {
        return this.ordersService.update(id, updateOrderDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ordersService.remove(id);
    }
}
