/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { META_ACCESS_LEVEL } from 'src/users/decorators/access-level-protect.decorator';
import { User } from 'src/users/entities/user.entity';

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
        const user = request.user as User;
        
    
        if ( !user ) {
            throw new UnauthorizedException('User not found ');
        }
    
        if ( !validAccessLevel.includes( user.access_level ) ) {
            throw new ForbiddenException(`User ${user.username} need a valid role: ${validAccessLevel}`);
        }

        return true;
    }
}
