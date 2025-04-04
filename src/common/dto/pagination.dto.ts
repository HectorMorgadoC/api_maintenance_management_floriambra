/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsBoolean, IsISO8601, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class PaginationDto {
    
    @IsString()
    @IsOptional()
    @MinLength(1)
    @IsUUID()
        team?: string;
    
    @IsString()
    @IsOptional()
    @MinLength(1)
    @IsUUID()
        user?: string;
    
    @IsOptional()
    @IsString()
    @IsISO8601({strict: true}) 
    date_time?: Date;


    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
        order_state?: boolean

}

