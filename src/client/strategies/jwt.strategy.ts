/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Client } from "../entities/client.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor(
        @InjectRepository(Client)
        private readonly userRepository: Repository<Client>,
        configService: ConfigService
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        super({
            secretOrKey: jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        
        });
    }
    async validate(payload: JwtPayload): Promise<Client> {
        // const { username } = payload;
        const { email } = payload;

        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['process']
        });

        if (!user) {
            throw new UnauthorizedException('Token Not valid');
        }

        if (!user.is_active) {
            throw new UnauthorizedException('Client is not active');
        }
        return user;
    }
}
