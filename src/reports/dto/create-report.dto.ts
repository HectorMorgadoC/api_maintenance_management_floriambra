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

export class CreateReportDto {
    @IsUUID()
        order: string;
    
    @IsUUID()
        user: string;
    
    @IsString()
    @MaxLength(100)
    @IsOptional()
        collaborators?: string;
    
    @IsString()
    @MaxLength(30)
        fault_type: string;
    
    @IsString()
    @MaxLength(30)
        type_of_maintenance: string;
    
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: 'The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ',
    })
        from_date: string;
    
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: 'The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ',
    })
        end_date: string;
    
    @IsString()
    @MaxLength(300)
        summary_of_activities: string;
    
    @IsString()
    @MaxLength(200)
    @IsOptional()
        used_spare_parts?: string;
    
    @IsString()
    @MaxLength(300)
    @IsOptional()
        remarks?: string;
    
    @IsBoolean()
    @IsOptional()
        maintenance_approval: boolean;
    
    @IsOptional()
    @IsBoolean()
        production_approval: boolean;
}
