/* eslint-disable prettier/prettier */
import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiOperation } from "@nestjs/swagger";
import { AccessLevelProtected } from "./access-level-protect.decorator";
import { UserAccessLevelGuard } from "../guards/user-role/user-role.guard";
import { AuthGuard } from "@nestjs/passport";
import { AccessLevel } from "../interfaces/access-level.inteface";

export function Auth(...roles: AccessLevel[]) {
    return applyDecorators(
        UseGuards(AuthGuard(), UserAccessLevelGuard),
        AccessLevelProtected(...roles),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiOperation({ summary: 'Authorization required' }),
    );
}