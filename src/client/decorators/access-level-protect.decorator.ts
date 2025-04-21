/* eslint-disable prettier/prettier */
import { AccessLevel } from "../interfaces/access-level.inteface";
import { SetMetadata } from "@nestjs/common";

/**
 * Metadata key for access level protection.
 */
export const META_ACCESS_LEVEL = "access_level";

/**
 * Decorator to protect routes based on access levels.
 * 
 * @param args - List of access levels required to access the route.
 * @returns A metadata decorator to set the required access levels.
 * 
 * @example
 * ```typescript
 * @AccessLevelProtected(AccessLevel.ADMIN, AccessLevel.SUPERUSER)
 * @Get('protected-route')
 * getProtectedRoute() {
 *   return 'This route is protected';
 * }
 * ```
 */
export const AccessLevelProtected = (...args: AccessLevel[]) => {
    return SetMetadata(META_ACCESS_LEVEL, args);
};
