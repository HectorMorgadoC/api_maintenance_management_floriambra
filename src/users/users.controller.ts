/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Res,
} from "@nestjs/common";
import { Response } from 'express';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginDto } from "./dto/login-user.dto";
import { Auth } from "./decorators/auth.decorator";
import { AccessLevel } from "./interfaces/access-level.inteface";
import { GetUser } from "./decorators/get-user.decorator";
import { User } from "./entities/user.entity";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Post("/login")
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response
    ) {
        const { token, user } = await this.usersService.login(loginDto);
        response.setHeader('Authorization', `Bearer ${token}`);
        return { user };
    }


    @Post()
    @Auth(AccessLevel.admin)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
    
    @Get()
    @Auth(AccessLevel.admin)
    findAll(@GetUser() user: User) {
        console.log(user.username);
        return this.usersService.findAll();
    }

    @Patch(":id")
    @Auth(AccessLevel.admin)
    update(
        @GetUser() user: User,
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(":id")
    @Auth(AccessLevel.admin)
    remove(@Param("id", ParseUUIDPipe) id: string) {
        return this.usersService.remove(id);
    }
}
