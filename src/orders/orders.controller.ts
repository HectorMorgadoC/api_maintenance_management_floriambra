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
import { Auth } from "src/users/decorators/auth.decorator";
import { AccessLevel } from "src/users/interfaces/access-level.inteface";

@Controller("order")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Auth(
        AccessLevel.admin,
        AccessLevel.operator,
        AccessLevel.production_supervisor,
        AccessLevel.technical_supervisor)
    @Post()
        create(@Body() createOrderDto: CreateOrderDto) {
            return this.ordersService.create(createOrderDto);
        }


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

    @Auth(
        AccessLevel.admin,
        AccessLevel.production_supervisor,
        AccessLevel.technical_supervisor)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ordersService.remove(id);
    }
}
