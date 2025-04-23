/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/client/entities/client.entity";

export class ClientDto {
    @ApiProperty({
        description: "The unique identifier of the client",
        type: "number"
    })
    id: number;

    @ApiProperty({
        description: "The email of the client",
        type: "string"
    })
    email: string;

    @ApiProperty({
        description: "The name of the client",
        type: "string"
    })
    name: string;
}

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const client = request.client as Client;

    if (!client) {
        throw new InternalServerErrorException("Client not found (request)");
    }
    return client;
});