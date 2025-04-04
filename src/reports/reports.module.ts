/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Report } from "./entities/report.entity";
import { OrdersModule } from "src/orders/orders.module";


@Module({
    controllers: [ReportsController],
    providers: [ReportsService],
    imports: [TypeOrmModule.forFeature([Report]),OrdersModule],
})
export class ReportsModule {}
