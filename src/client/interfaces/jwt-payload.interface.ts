import { UUID } from "crypto";

/* eslint-disable prettier/prettier */
export interface JwtPayload {
    sub: UUID;
    access_level: string;
    process: string;
}