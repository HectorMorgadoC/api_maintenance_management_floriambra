/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsBoolean, IsISO8601, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
    
    @ApiProperty({   
        required: false, 
        description: 'Team UUID', 
        example: '123e4567-e89b-12d3-a456-426614174000' 
    })
    @IsString()
    @IsOptional()
    @MinLength(1)
    @IsUUID()
        team?: string;
    
    @ApiProperty({ 
        required: false, 
        description: 'User UUID', 
        example: '123e4567-e89b-12d3-a456-426614174000' 
    })
    @IsString()
    @IsOptional()
    @MinLength(1)
    @IsUUID()
        user?: string;
    
    @ApiProperty({ 
        required: false, 
        description: 'Date and time in ISO format', 
        example: '2023-01-01T00:00:00Z' 
    })
    @IsOptional()
    @IsString()
    @IsISO8601({strict: true}) 
        date_time?: Date;

    @ApiProperty({ 
        required: false, 
        description: 'Order state boolean flag', 
        example: true 
    })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
        order_state?: boolean
}

