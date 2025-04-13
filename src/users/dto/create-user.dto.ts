/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength, Matches, IsEnum, IsBoolean } from "class-validator";
import { AccessLevel } from "../interfaces/access-level.inteface";

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
    @IsEnum(AccessLevel, {
        message: "Access level must be one of the following values: supervisor, operator or technical"
    })
	    access_level?: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
        password: string;

    @IsBoolean()
    @IsOptional()
        is_actived?: true;
}
