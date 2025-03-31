/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { IsString, MaxLength, MinLength, Matches } from "class-validator";


export class LoginDto {


    @IsString()
    @MaxLength(30)
    @MinLength(5)
    username: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
    password: string;
}
