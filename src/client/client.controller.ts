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
    Req,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Response } from "express";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { LoginDto } from "./dto/login-user.dto";
import { Auth } from "./decorators/auth.decorator";
import { AccessLevel } from "./interfaces/access-level.inteface";
import { GetUser } from "./decorators/get-client.decorator";
import { Client } from "./entities/client.entity";

@ApiTags("client")
@Controller("client")
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post("/login")
    @ApiOperation({ summary: "User login" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 401, description: "Credentials are not valid" })
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response
    ) {
        const { token, client: client } = await this.clientService.login(loginDto);
        response.setHeader("Authorization", `Bearer ${token}`);
        return { client: client };
    }

    @Get("/login/check")
    @Auth()
    checkAuth(@GetUser() client: Client){
        return this.clientService.checkAuthStatus(client)
    }

    /*
    @Get("/login/check")
    @Auth()
    checkAuth(@Req() request: Request){
        console.log(request)

        //return this.clientService.checkAuthStatus(client)
    }
    */

    @Post()
    @Auth(AccessLevel.admin)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Create a new client" })
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 400, description: "Bad Request." })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "Client XXXX need a valid role: admin" })
    create(@Body() createUserDto: CreateClientDto) {
        return this.clientService.create(createUserDto);
    }

    @Get()
    @Auth(AccessLevel.admin)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all clients" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "User XXXX need a valid role: admin" })
    findAll(@GetUser() client: Client) {
        return this.clientService.findAll();
    }

    @Patch(":id")
    @Auth(AccessLevel.admin)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Update a client by ID" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: "Validation failed (uuid is expected)" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "Client XXXX need a valid role: admin" })
    @ApiResponse({ status: 404, description: "Client with id: XXXX not found" })
    update(
        @GetUser() client: Client,
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateClientDto,
    ) {
        return this.clientService.update(id, updateUserDto);
    }

    @Delete(":id")
    @Auth(AccessLevel.admin)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete a user by ID" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: "Validation failed (uuid is expected)" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 403, description: "Client XXXX need a valid role: admin" })
    @ApiResponse({ status: 404, description: "Client with id: XXXX not found" })
    remove(@Param("id", ParseUUIDPipe) id: string) {
        return this.clientService.remove(id);
    }
}
