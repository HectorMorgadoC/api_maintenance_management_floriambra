/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsISO8601, IsOptional, IsString, MinLength } from "class-validator";

export class PaginationDto {
    @IsString()
    @IsOptional()
    @MinLength(1)
        process?: string;
    
    @IsString()
    @IsOptional()
    @MinLength(1)
        team?: string;
    
    @IsString()
    @IsOptional()
    @MinLength(1)
        applicant?: string;
    
        @IsOptional()
        @IsString()
        @IsISO8601({strict: true}) 
        date_time?: Date;

}

