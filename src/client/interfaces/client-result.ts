/* eslint-disable prettier/prettier */
import { UUID } from "crypto";

export interface ClientResult {
    id: UUID,
    username: string,
    process: string,
    access_level?: string
};