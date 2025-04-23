/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { META_ACCESS_LEVEL } from 'src/client/decorators/access-level-protect.decorator';
import { Client } from 'src/client/entities/client.entity';

/**
 * @swagger
 * @guard UserAccessLevelGuard
 * @description Guard to validate the user's access level based on metadata defined in the route handler.
 * 
 * @constructor
 * @param {Reflector} reflector - A service to retrieve metadata for the route handler.
 * 
 * @method canActivate
 * @description Determines whether the current user has the required access level to activate the route.
 * 
 * @param {ExecutionContext} context - The execution context of the request.
 * @returns {boolean | Promise<boolean> | Observable<boolean>} Returns `true` if the user has the required access level, otherwise throws an exception.
 * 
 * @throws {UnauthorizedException} If the user is not found in the request.
 * @throws {ForbiddenException} If the user's access level does not match the required access level.
 * 
 * @example
 * // Apply the guard to a route
 * @UseGuards(UserAccessLevelGuard)
 * @SetMetadata(META_ACCESS_LEVEL, 'admin')
 * @Get('protected-route')
 * protectedRoute() {
 *   return 'This route is protected by access level';
 * }
 */
@Injectable()
export class UserAccessLevelGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    
        const validAccessLevel = this.reflector.get<string>(META_ACCESS_LEVEL, context.getHandler());
    
        if ( !validAccessLevel ) {
            return true;
        }
    
        if ( validAccessLevel.length === 0 ) {
            return true;
        }
    
        const request = context.switchToHttp().getRequest();
        const user = request.user as Client;
        
    
        if ( !user ) {
            throw new UnauthorizedException('Client not found ');
        }
    
        if ( !validAccessLevel.includes( user.access_level ) ) {
            throw new ForbiddenException(`Client ${user.username} need a valid role`);
        }

        return true;
    }
}
