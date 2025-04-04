/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { ProcessModule } from "../process/process.module";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TeamModule } from "src/team/team.module";


@Module({
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        ProcessModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        
        JwtModule.registerAsync({
            imports:[ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: ( configService: ConfigService ) => {
                return {
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
                }
            }
        }),
        TeamModule,
        ProcessModule
    ],
    exports: [UsersService, TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class UsersModule {}
