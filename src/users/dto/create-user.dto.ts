/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength, Matches } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @MaxLength(30)
    @MinLength(10)
        username: string;

    @IsString()
    @IsEmail()
    @IsOptional()
        email?: string;

    @IsUUID()
    @IsOptional()
	    process?: string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
	    access_level?: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
        password: string;
}
