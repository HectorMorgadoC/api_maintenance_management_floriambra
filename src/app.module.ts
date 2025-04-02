/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TeamModule } from "./team/team.module";
import { ProcessModule } from "./process/process.module";
import { OrdersModule } from "./orders/orders.module";
import { ReportsModule } from "./reports/reports.module";
import { CommonModule } from "./common/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Process } from "./process/entities/process.entity";
import { Team } from "./team/entities/team.entity";
import { Order } from "./orders/entities/order.entity";
import { Report } from "./reports/entities/report.entity";
import { User } from "./users/entities/user.entity";
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            autoLoadEntities: true,
            entities:[Process,Team,Order,Report,User],
            synchronize: true,
            extra: { 
                timezone: 'Z'
            }
        }),
        UsersModule,
        TeamModule,
        ProcessModule,
        OrdersModule,
        ReportsModule,
        CommonModule,
    ],
})
export class AppModule {
}
