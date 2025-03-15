/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @MaxLength(30)
    @MinLength(10)
        username: string;

    @IsUUID()
	    id_process: string;

    @IsString()
    @MaxLength(20)
	    access_level: string;

    @IsString()
	    password: string;
}
