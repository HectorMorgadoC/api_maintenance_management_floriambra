/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    IsBoolean,
    IsISO8601,
    IsOptional,
    IsString,
    IsUUID,
    Max,
} from "class-validator";

export class CreateOrderDto {
    @IsUUID()
        id_process: string;
    
    @IsUUID()
        id_team: string;
    
    @IsUUID()
        id_applicant: string;
    
    @IsString()
    @IsISO8601()
        date_time: string;
    
    @IsString()
    @Max(200)
        fault_description: string;
    
    @IsBoolean()
    @IsOptional()
        order_state: boolean;
}
