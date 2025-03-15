/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    IsBoolean,
    IsISO8601,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from "class-validator";

export class CreateReportDto {
    @IsUUID()
        id_work_order: string;
    
    @IsUUID()
        id_responsible_technician: string;
    
    @IsString()
    @MaxLength(100)
        collaborators: string;
    
    @IsString()
    @MaxLength(20)
        fault_type: string;
    
    @IsString()
    @MaxLength(20)
        type_of_maintenance: string;
    
    @IsString()
    @IsISO8601({ strict: true })
        from_date: Date;
    
    @IsString()
    @IsISO8601({ strict: true })
        end_date: Date;
    
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
        remarks: string;
    
    @IsBoolean()
    @IsOptional()
        maintenance_approval: boolean;
    
    @IsOptional()
    @IsBoolean()
        production_approval: boolean;
}
