/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min } from "class-validator"

export class CreateTeamDto {
    
    @IsString()
    @MaxLength(50)
        name: string;

    @IsString()
    @MaxLength(200)
        description: string;

    @IsString()
    @MaxLength(40)
    @IsOptional()
	    march: string;

    @IsString()
    @MaxLength(40)
    @IsOptional()
	    model: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @IsOptional()
	    working_voltage: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
	    kilowatts: number;

    @IsUUID()
    @IsOptional()
        process?: string;
}
