/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, 
        ApiOperation, 
        ApiResponse, 
        ApiBearerAuth 
} from "@nestjs/swagger";
import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { GetUser } from "src/client/decorators/get-client.decorator";
import { Client } from "src/client/entities/client.entity";
import { AccessLevel } from "src/client/interfaces/access-level.inteface";
import { Auth } from "src/client/decorators/auth.decorator";

@ApiTags("Teams")
@ApiBearerAuth()
@Controller("team")
export class TeamController {
    
    constructor(private readonly teamService: TeamService) {}

    @Auth(AccessLevel.admin)
    @Post()
    @ApiOperation({ summary: "Create a new team" })
    @ApiResponse({ status: 201 })
    @ApiResponse({ status: 400, description: "Bad Request." })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamService.create(createTeamDto);
    }

    @Auth(
        AccessLevel.admin, 
        AccessLevel.production_supervisor, 
        AccessLevel.technical_supervisor,
        AccessLevel.operator)
    @Get()
    @ApiOperation({ summary: "Retrieve all teams" })
    @ApiResponse({ status: 200, description: "List of teams retrieved successfully." })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    findAll(@GetUser() user: Client) {
        return this.teamService.findAll(user.access_level as AccessLevel);
    }

    @Auth(AccessLevel.admin)
    @Patch(":id")
    @ApiOperation({ summary: "Update a team by ID" })
    @ApiResponse({ status: 200, description: "The team has been successfully updated." })
    @ApiResponse({ status: 400, description: "Bad Request." })
    @ApiResponse({ status: 401, description: "Unautorized." })
    @ApiResponse({ status: 403, description: "Forbidden." })
    @ApiResponse({ status: 404, description: "Team not found." })
    update(@Param("id", ParseUUIDPipe) id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamService.update(id, updateTeamDto);
    }

    // This driver is optional and must be verified for service.

    // @Delete(":id")
    // @ApiOperation({ summary: "Delete a team by ID" })
    // @ApiResponse({ status: 200, description: "The team has been successfully deleted." })
    // @ApiResponse({ status: 404, description: "Team not found." })
    // remove(@Param("id", ParseUUIDPipe) id: string) {
    //     return this.teamService.remove(id);
    // }
}
