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
import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { GetUser } from "src/users/decorators/get-user.decorator";
import { User } from "src/users/entities/user.entity";
import { AccessLevel } from "src/users/interfaces/access-level.inteface";
import { Auth } from "src/users/decorators/auth.decorator";

@Controller("team")
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

    @Auth(AccessLevel.admin)
    @Post()
        create(@Body() createTeamDto: CreateTeamDto) {
            return this.teamService.create(createTeamDto);
        }

    @Auth(AccessLevel.admin,AccessLevel.production_supervisor,AccessLevel.operator)
    @Get()
    findAll(@GetUser() user: User) {
        return this.teamService.findAll(user.access_level as AccessLevel);
    }

    @Auth(AccessLevel.admin)
    @Patch(":id")
    update(@Param("id", ParseUUIDPipe) id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamService.update(id, updateTeamDto);
    }

    // This driver is optional and must be verified for service.

    // @Delete(":id")
    // remove(@Param("id", ParseUUIDPipe) id: string) {
    //     return this.teamService.remove(id);
    // }
}
