import { ApiResponse, Graduate, Sponsor, User } from '@/types';
import { client } from './client';
import { API_ENDPOINTS } from './constants';

class UserService {
    async getMe(): Promise<ApiResponse<User>> {
        return await client.get<User>(API_ENDPOINTS.USER.ME);
    }

    async getProfile(): Promise<ApiResponse<User>> {
        return await client.get<User>(API_ENDPOINTS.USER.ME);
    }

    async getGraduates(): Promise<ApiResponse<Graduate[]>> {
        return await client.get<Graduate[]>(API_ENDPOINTS.USER.GRADUATE);
    }

    async getSponsors(): Promise<ApiResponse<Sponsor[]>> {
        return await client.get<Sponsor[]>(API_ENDPOINTS.USER.SPONSORS);
    }


}

export const userService = new UserService();