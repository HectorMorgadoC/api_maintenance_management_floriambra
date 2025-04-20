/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { TeamModule } from "src/team/team.module";
import { ApiTags } from "@nestjs/swagger";
import { UsersModule } from "src/users/users.module";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService],
    imports: [TypeOrmModule.forFeature([Order]),
    TeamModule,
    forwardRef(() => UsersModule)],
    exports: [OrdersService]
})
@ApiTags('orders')
export class OrdersModule {}
