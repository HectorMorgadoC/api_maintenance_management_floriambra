/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/client/entities/client.entity";

export class UserDto {
    @ApiProperty({ description: 'The unique identifier of the user' })
        id: number;

    @ApiProperty({ description: 'The email of the user' })
        email: string;

    @ApiProperty({ description: 'The name of the user' })
        name: string;
}

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as Client;

    if (!user) {
        throw new InternalServerErrorException('User not found (request)');
    }
    return user;
});