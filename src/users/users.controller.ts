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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Response } from 'express';
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginDto } from "./dto/login-user.dto";
import { Auth } from "./decorators/auth.decorator";
import { AccessLevel } from "./interfaces/access-level.inteface";
import { GetUser } from "./decorators/get-user.decorator";
import { User } from "./entities/user.entity";

@ApiTags("users") // Agrupa las rutas bajo el tag "users" en Swagger
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("/login")
    @ApiOperation({ summary: "User login" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 401, description: "Credentials are not valid" })
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
    @ApiBearerAuth() // Indica que esta ruta requiere autenticación
    @ApiOperation({ summary: "Create a new user" })
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 400, description: "Bad Request." })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "User XXXX need a valid role: admin" })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
    
    @Get()
    @Auth(AccessLevel.admin)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all users" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "User XXXX need a valid role: admin" })
    findAll(@GetUser() user: User) {
        console.log(user.username);
        return this.usersService.findAll();
    }

    @Patch(":id")
    @Auth(AccessLevel.admin)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Update a user by ID" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: "Validation failed (uuid is expected)" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "User XXXX need a valid role: admin" })
    @ApiResponse({ status: 404, description: "User with id: XXXX not found" })
    update(
        @GetUser() user: User,
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(":id")
    @Auth(AccessLevel.admin)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete a user by ID" })
    
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: "Validation failed (uuid is expected)" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "User XXXX need a valid role: admin" })
    @ApiResponse({ status: 404, description: "User with id: XXXX not found" })
    remove(@Param("id", ParseUUIDPipe) id: string) {
        return this.usersService.remove(id);
    }
}
