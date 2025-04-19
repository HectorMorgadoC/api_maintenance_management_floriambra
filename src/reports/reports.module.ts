/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Report } from "./entities/report.entity";
import { OrdersModule } from "src/orders/orders.module";
import { ApiTags } from "@nestjs/swagger";



@Module({
    controllers: [ ReportsController ],
    providers: [ ReportsService ],
    imports: [ TypeOrmModule.forFeature([Report] ),
        OrdersModule ],
    //forwardRef(() => UsersModule )],// esto se hace cuando 2 servicios se son circulares, servicio A necesita de B y B necesita de A
    exports: [ ReportsService ]
})

@ApiTags('orders')
export class ReportsModule {}
