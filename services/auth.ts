import { client } from './client';
import { ApiResponse, AuthResponse, CreateUser, LoginRequest, SignupRequest } from "@/types";

export class AuthService {
    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        return await client.post<AuthResponse>('/auth/login', data);
    }

    async signup(data: CreateUser): Promise<ApiResponse<AuthResponse>> {
        return await client.post<AuthResponse>('/auth/register', data)
    }

    async ping(): Promise<ApiResponse<AuthResponse>> {
        return await client.get<AuthResponse>('/auth/ping') 
    }
}

export const authService = new AuthService()