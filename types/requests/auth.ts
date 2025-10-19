import { UserType } from "../user";

export interface SignupRequest {
    name: string
    email: string;
    password: string;
    role: UserType;
    finishYear?: number
    organization?: string
    country?: string
}

export interface LoginRequest {
    email: string;
    password: string;
}
