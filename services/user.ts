import { ApiResponse, Graduate, Sponsor, User, Project } from '@/types';
import { client } from './client';
import { API_ENDPOINTS } from './constants';

class UserService {
    async getMe(): Promise<ApiResponse<User>> {
        return await client.get<User>(API_ENDPOINTS.USER.ME);
    }
    async getMyGraduate(): Promise<ApiResponse<Graduate>> {
        return await client.get<Graduate>(API_ENDPOINTS.USER.GRADUATE_ME);
    }
    async getMySponsor(): Promise<ApiResponse<Sponsor>> {
        return await client.get<Sponsor>(API_ENDPOINTS.USER.SPONSOR_ME);
    }

    async getSavedProjects(): Promise<ApiResponse<Project[]>> {
        return await client.get<Project[]>(API_ENDPOINTS.USER.SAVED_PROJECTS);
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

    async getAllUsers(): Promise<ApiResponse<User[]>> {
        return await client.get<User[]>(API_ENDPOINTS.USER.ALL);
    }
}

export const userService = new UserService();