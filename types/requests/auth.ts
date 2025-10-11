import { UserType } from "../user";

export interface SignupRequest {
    name:string
    email: string;
    password: string;
    role: UserType;
}