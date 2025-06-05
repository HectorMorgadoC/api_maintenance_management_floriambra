/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength, Matches, IsEmail } from "class-validator";

export class LoginDto {
    // @ApiProperty({
    //     description: "Username to log in",
    //     example: "user123",
    //     nullable: true,
    //     minLength: 5,
    //     maxLength: 30,
    //     type: "string"
    // })
    // @IsString()
    // @MaxLength(30)
    // @MinLength(5)
    // username: string;

    @ApiProperty({
            description: "User email (optional)",
            example: "usuario123@correo.com",
            nullable: true,
            type: "string"
        })
        @IsString()
        @IsEmail()
        email?: string;

    @ApiProperty({
        description: "Client password. Must contain at least one uppercase letter, one lowercase letter, and one number.",
        example: "Password123",
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
}
