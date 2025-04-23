/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTeamDto {

    @ApiProperty({ 
        description: "Name of the team", 
        maxLength: 50,
        example: "Team A"
    })
    @IsString()
    @MaxLength(50)
        name: string;


    @ApiProperty({ 
        description: "Description of the team", 
        maxLength: 200,
        example: "This team handles maintenance for production line A."
    })
    @IsString()
    @MaxLength(200)
        description: string;


    @ApiPropertyOptional({ 
        description: "March of the team", 
        maxLength: 40,
        example: "March2023as"
    })
    @IsString()
    @MaxLength(40)
    @IsOptional()
        march?: string;


    @ApiPropertyOptional({ 
        description: "Model of the team", 
        maxLength: 40,
        example: "ModelX"
    })
    @IsString()
    @MaxLength(40)
    @IsOptional()
        model?: string;


    @ApiPropertyOptional({ 
        description: "Working voltage of the team", 
        minimum: 1,
        example: 220
    })
    @IsNumber()
    @IsPositive()
    @Min(1)
    @IsOptional()
        working_voltage?: number;


    @ApiPropertyOptional({ 
        description: "Kilowatts of the team",
        example: 15
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
        kilowatts?: number;


    @ApiPropertyOptional({ 
        description: "Indicates if the team is active", 
        default: true 
    })
    @IsBoolean()
    @IsOptional()
        is_actived?: true;


    @ApiPropertyOptional({ 
        description: "Process ID associated with the team", 
        format: "uuid",
        example: "123e4567-e89b-12d3-a456-426614174000"
    })
    @IsUUID()
    @IsOptional()
        process?: string;
}
