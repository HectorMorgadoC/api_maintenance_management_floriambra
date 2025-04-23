/* eslint-disable indent */
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
        maxLength: 30,
        type: "string"
    })
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    username: string;

    @ApiProperty({
        description: "User email (optional)",
        example: "usuario123@correo.com",
        nullable: true,
        type: "string"
    })
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: "Process ID (optional)",
        example: "550e8400-e29b-41d4-a716-446655440000",
        nullable: true,
        type: "string"
    })
    @IsUUID()
    @IsOptional()
    process?: string;

    @ApiProperty({
        description: "Access level of the user (optional)",
        example: "supervisor",
        enum: AccessLevel,
        nullable: true,
        maximum: 25,
        type: "string"
    })
    @IsString()
    @MaxLength(25)
    @IsOptional()
    @IsEnum(AccessLevel, {
        message: "Access level must be one of the following values: technical_supervisor, production_supervisor,operator or technical"
    })
    access_level?: string;

    @ApiProperty({
        description: "Password for the user",
        example: "Password123!",
        nullable: false,
        minLength: 6,
        maxLength: 50,
        type: "string"
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "The password must have a Uppercase, lowercase letter and a number"
    })
    password: string;

    @ApiProperty({
        description: "Indicates if the user is active (optional)",
        example: true,
        nullable: true,
        type: "boolean"
    })
    @IsBoolean()
    @IsOptional()
    is_actived?: true;
}
