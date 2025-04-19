/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({
        description: 'ID Team',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    })
    @IsUUID()
    team: string;
    
    @ApiProperty({
        description: 'ID user',
        example: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'
    })
    @IsUUID()
    user: string;
    
    @ApiProperty({
        description: 'notification date',
        example: '2023-08-15T14:30:00.000Z'
    })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: 'The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ',
    })
    notice_date: string;
    
    @ApiProperty({
        description: 'fault description',
        minLength: 10,
        maxLength: 200,
        example: 'The equipment has failures in the cooling system'
    })
    @IsString()
    @MinLength(10)
    @MaxLength(200)
    fault_description: string;
    
    @ApiPropertyOptional({
        description: 'Order state',
        default: false,
        example: true
    })
    @IsBoolean()
    @IsOptional()
    order_state: boolean;
}
