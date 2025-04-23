/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateReportDto {
    @ApiProperty({
        description: "Order UUID",
        example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        type: "string"
    })
    @IsUUID()
    order: string;

    @ApiProperty({
        description: "Client UUID",
        example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        type: "string"
    })
    @IsUUID()
    client: string;

    @ApiPropertyOptional({
        description: "Collaborators involved",
        maxLength: 100,
        example: "Services Integrtion SAC",
        type: "string"
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    collaborators?: string;

    @ApiProperty({
        description: "Type of fault",
        maxLength: 30,
        example: "Electrical",
        type: "string"
    })
    @IsString()
    @MaxLength(30)
    fault_type: string;

    @ApiProperty({
        description: "Type of maintenance",
        maxLength: 30,
        example: "Corrective maintenance",
        type: "string"
    })
    @IsString()
    @MaxLength(30)
    type_of_maintenance: string;

    /**
     * Start date for the report in ISO 8601 format
     * @remarks
     * The date string must match the exact format: YYYY-MM-DDTHH:mm:ss.SSSZ
     * - YYYY: four-digit year
     * - MM: two-digit month (01-12)
     * - DD: two-digit day (01-31) 
     * - T: separator between date and time
     * - HH: two-digit hour in 24h format (00-23)
     * - mm: two-digit minutes (00-59)
     * - ss: two-digit seconds (00-59)
     * - SSS: three-digit milliseconds (000-999)
     * - Z: UTC timezone indicator
     * @example '2023-08-15T14:30:00.000Z'
     */
    @ApiProperty({
        description: "Start date (format: YYYY-MM-DDTHH:mm:ss.SSSZ)",
        example: "2023-08-15T14:30:00.000Z",
        type: "string"
    })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: "The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ",
    })
    from_date: string;

    @ApiProperty({
        description: "End date (format: YYYY-MM-DDTHH:mm:ss.SSSZ)",
        example: "2023-08-15T14:30:00.000Z",
        type: "string"
    })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: "The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ",
    })
    end_date: string;

    @ApiProperty({
        description: "Summary of maintenance activities",
        maxLength: 300,
        example: "Damaged fuses are replaced, and current measurement is performed.",
        type: "string"
    })
    @IsString()
    @MaxLength(300)
    summary_of_activities: string;

    @ApiPropertyOptional({
        description: "Spare parts used",
        maxLength: 200,
        example: "Fuses AH784 Siemens(2)",
        type: "string"
    })
    @IsString()
    @MaxLength(200)
    @IsOptional()
    used_spare_parts?: string;

    @ApiPropertyOptional({
        description: "Additional remarks",
        maxLength: 300,
        example: "Perform transmission pulley change",
        type: "string"
    })
    @IsString()
    @MaxLength(300)
    @IsOptional()
    remarks?: string;

    @ApiPropertyOptional({
        description: "Maintenance approval status",
        example: true,
        type: "boolean"
    })
    @IsBoolean()
    @IsOptional()
    maintenance_approval: boolean;

    @ApiPropertyOptional({
        description: "Production approval status",
        example: true,
        type: "boolean"
    })
    @IsOptional()
    @IsBoolean()
    production_approval: boolean;
}
