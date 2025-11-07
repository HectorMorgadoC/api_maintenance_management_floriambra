/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Report } from "./entities/report.entity";
import { OrdersModule } from "src/orders/orders.module";
import { ApiTags } from "@nestjs/swagger";
import { ClientModule } from "src/client/client.module";
import { EmailModule } from "src/email/email.module";

@Module({
    controllers: [ReportsController],
    providers: [ReportsService],
    imports: [
        TypeOrmModule.forFeature([Report]),
        OrdersModule,
        EmailModule,
        forwardRef(() => ClientModule),
    ], // This is done when 2 services are circular, service A needs B and B needs A

    exports: [ReportsService],
})
@ApiTags("orders")
export class ReportsModule { }
