/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";

export class CreateOrderDto {
    @IsUUID()
        team: string;
    
    @IsUUID()
        user: string;
    
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message: 'The date must be in the exact format YYYY-MM-DDTHH:mm:ss.SSSZ',
    })
        notice_date: string;
    
    @IsString()
    @MinLength(10)
    @MaxLength(200)
        fault_description: string;
    
    @IsBoolean()
    @IsOptional()
        order_state: boolean;
}
