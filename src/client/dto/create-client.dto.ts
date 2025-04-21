/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength, Matches, IsEnum, IsBoolean } from "class-validator";
import { AccessLevel } from "../interfaces/access-level.inteface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
    
    @ApiProperty({
        description: "Username to log in",
        example: "usuario123",
        nullable: false,
        minLength: 5,
        maxLength: 30
    })
    @IsString()
    @MaxLength(30)
    @MinLength(5)
        username: string;

    @ApiProperty({
        description: "User email (optional)",
        example: "usuario123@correo.com",
        nullable: true
    })
    @IsString()
    @IsEmail()
    @IsOptional()
        email?: string;

    @ApiProperty({
        description: "Process ID (optional)",
        example: "550e8400-e29b-41d4-a716-446655440000",
        nullable: true
    })
    @IsUUID()
    @IsOptional()
        process?: string;

    @ApiProperty({
        description: "Access level of the user (optional)",
        example: "supervisor",
        enum: AccessLevel,
        nullable: true
    })
    @IsString()
    @MaxLength(20)
    @IsOptional()
    @IsEnum(AccessLevel, {
        message: "Access level must be one of the following values: supervisor, operator or technical"
    })
        access_level?: string;

    @ApiProperty({
        description: "Password for the user",
        example: "Password123!",
        nullable: false,
        minLength: 6,
        maxLength: 50
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
        password: string;

    @ApiProperty({
        description: "Indicates if the user is active (optional)",
        example: true,
        nullable: true
    })
    @IsBoolean()
    @IsOptional()
        is_actived?: true;
}
