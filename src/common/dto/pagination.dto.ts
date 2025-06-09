/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsISO8601, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { StatusOrder } from "src/orders/interface/status-order";

export class PaginationDto {
    @ApiProperty({
        required: false,
        description: "Team UUID",
        example: "123e4567-e89b-12d3-a456-426614174000",
        type: "string"
    })
    @IsString()
    @IsOptional()
    @MinLength(1)
    @IsUUID()
    team?: string;

    @ApiProperty({
        required: false,
        description: "Client UUID",
        example: "123e4567-e89b-12d3-a456-426614174000",
        type: "string"
    })
    @IsString()
    @IsOptional()
    @MinLength(1)
    @IsUUID()
    client?: string;

    @ApiProperty({
        required: false,
        description: "Date and time in ISO format",
        example: "2023-01-01T00:00:00Z"
    })
    @IsOptional()
    @IsString()
    @IsISO8601({ strict: true })
    date_time?: Date;

    @ApiProperty({
        required: false,
        description: "Order status tracking",
        example: "done",
        type: "string"
    })
    @IsOptional()
    @IsEnum(StatusOrder)
    order_state?: StatusOrder;
}
