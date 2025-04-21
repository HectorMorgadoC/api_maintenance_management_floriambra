/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { TeamModule } from "src/team/team.module";
import { ApiTags } from "@nestjs/swagger";
import { ClientModule } from "src/client/client.module";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService],
    imports: [TypeOrmModule.forFeature([Order]),
    TeamModule,
    forwardRef(() => ClientModule)],
    exports: [OrdersService]
})
@ApiTags('orders')
export class OrdersModule {}
