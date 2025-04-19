/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { TeamModule } from "src/team/team.module";
import { ApiTags } from "@nestjs/swagger";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService],
    imports: [TypeOrmModule.forFeature([Order]),TeamModule],
    exports: [OrdersService]
})
@ApiTags('orders')
export class OrdersModule {}
