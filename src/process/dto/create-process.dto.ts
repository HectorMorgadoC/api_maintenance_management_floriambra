/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProcessDto {
    @ApiProperty({
        description: "The name of the process",
        maxLength: 50,
        example: "Process Name",
        type: "string"
    })
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: "A brief description of the process",
        maxLength: 200,
        example: "This is a description of the process.",
        type: "string"
    })
    @IsString()
    @MaxLength(200)
    description: string;

    @ApiPropertyOptional({
        description: "Indicates if the process is active",
        example: true,
        type: "boolean"
    })
    @IsBoolean()
    @IsOptional()
    is_actived?: true;
}
