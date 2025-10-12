import { client } from './client';
import { API_ENDPOINTS } from './constants';
import { ApiResponse, AuthResponse, LoginRequest, SignupRequest } from "@/types";

export class AuthService {
    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        return await client.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    }

    async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
        return await client.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, data)
    }


}

export const authService = new AuthService()