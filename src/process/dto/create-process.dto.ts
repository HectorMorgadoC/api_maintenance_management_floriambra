/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, MaxLength } from "class-validator";

export class CreateProcessDto {
    
    @IsString()
    @MaxLength(50)
        name: string;

    @IsString()
    @MaxLength(200)
	    description: string;
}
