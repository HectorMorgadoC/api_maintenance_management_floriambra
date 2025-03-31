/* eslint-disable prettier/prettier */
import { AccessLevel } from "../interfaces/access-level.inteface";
import { SetMetadata } from "@nestjs/common";

export const META_ACCESS_LEVEL = "access_level";

export const AccessLevelProtected = (...args: AccessLevel[]) => {
    return SetMetadata(META_ACCESS_LEVEL, args);
};
