import { client } from './client';
import { API_ENDPOINTS } from './constants';
import { ApiResponse, AuthResponse, LoginRequest, SignupRequest, GoogleAuthRequest } from "@/types";

export class AuthService {
    async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
        return await client.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    }

    async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
        return await client.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, data)
    }

    async google(data:GoogleAuthRequest): Promise<ApiResponse<void>> {
        console.log('google request',data)
        return await client.post<void>(API_ENDPOINTS.AUTH.GOOGLE_REGISTER, data)
    }


}

export const authService = new AuthService()