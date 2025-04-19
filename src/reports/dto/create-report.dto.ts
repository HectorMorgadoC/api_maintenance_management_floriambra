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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReportDto {
    @ApiProperty({ 
        description: 'Order UUID',
        example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
    })
    @IsUUID()
        order: string;
    
    @ApiProperty({ 
        description: 'User UUID',
        example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
    })
    @IsUUID()
        user: string;
    
    @ApiPropertyOptional({ 
        description: 'Collaborators involved', 
        maxLength: 100 ,
        example: "Services Integrtion SAC"
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
        collaborators?: string;
    
    @ApiProperty({ 
        description: 'Type of fault', 
        maxLength: 30, 
        example: "Electrical"
    })
    @IsString()
    @MaxLength(30)
        fault_type: string;
    
    @ApiProperty({ 
        description: 'Type of maintenance', 
        maxLength: 30,
        example: "Corrective maintenance"
    })
    @IsString()
    @MaxLength(30)
        type_of_maintenance: string;
    
    @ApiProperty({ 
        description: 'Start date (format: YYYY-MM-DDTHH:mm:ss.SSSZ)', 
        example: "2023-08-15T14:30:00.000Z"
    })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: 'The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ',
    })
        from_date: string;
    
    @ApiProperty({ 
        description: 'End date (format: YYYY-MM-DDTHH:mm:ss.SSSZ)', 
        example: "2023-08-15T14:30:00.000Z"
    })
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: 'The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ',
    })
        end_date: string;
    
    @ApiProperty({ 
        description: 'Summary of maintenance activities', 
        maxLength: 300,
        example: "Damaged fuses are replaced, and current measurement is performed."
    })
    @IsString()
    @MaxLength(300)
        summary_of_activities: string;
    
    @ApiPropertyOptional({ 
        description: 'Spare parts used', 
        maxLength: 200,
        example: "Fuses AH784 Siemens(2)"
    })
    @IsString()
    @MaxLength(200)
    @IsOptional()
        used_spare_parts?: string;
    
    @ApiPropertyOptional({ 
        description: 'Additional remarks', 
        maxLength: 300, 
        example: "Perform transmission pulley change"
    })
    @IsString()
    @MaxLength(300)
    @IsOptional()
        remarks?: string;
    
    @ApiPropertyOptional({ 
        description: 'Maintenance approval status', 
        example:true
    })
    @IsBoolean()
    @IsOptional()
        maintenance_approval: boolean;
    
    @ApiPropertyOptional({ 
        description: 'Production approval status', 
        example: true
    })
    @IsOptional()
    @IsBoolean()
        production_approval: boolean;
}
