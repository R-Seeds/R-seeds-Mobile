import { Project, ProjectCreateRequest, ApiResponse, ProjectUpdateRequest, DonorProject } from '@/types';
import { client } from './client';
import { API_ENDPOINTS } from './constants';
import { AxiosProgressEvent, CancelToken } from 'axios';

class ProjectService {
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return await client.get<Project[]>(API_ENDPOINTS.PROJECT.ALL);
  }

  async getDonorProjects(): Promise<ApiResponse<DonorProject[]>> {
    return await client.get<DonorProject[]>(API_ENDPOINTS.PROJECT.DONOR);
  }

  async getProjectById(id: string): Promise<ApiResponse<Project>> {
    return await client.get<Project>(API_ENDPOINTS.PROJECT.BY_ID(id));
  }

  async getMyProjects(): Promise<ApiResponse<Project[]>> {
    return await client.get<Project[]>(API_ENDPOINTS.PROJECT.MY_PROJECTS);
  }

  async getProjectsByCategory(category: string): Promise<ApiResponse<Project[]>> {
    return await client.get<Project[]>(API_ENDPOINTS.PROJECT.BY_CATEGORY(category));
  }

  async getProjectsByStatus(status: string): Promise<ApiResponse<Project[]>> {
    return await client.get<Project[]>(API_ENDPOINTS.PROJECT.BY_STATUS(status));
  }

  async getTrendingProjects(): Promise<ApiResponse<Project[]>> {
    return await client.get<Project[]>(API_ENDPOINTS.PROJECT.TRENDING);
  }

  async getSpotlightProjects(): Promise<ApiResponse<Project[]>> {
    return await client.get<Project[]>(API_ENDPOINTS.PROJECT.SPOTLIGHT);
  }

  async searchProjects(title: string): Promise<ApiResponse<Project[]>> {
    return await client.get<Project[]>(API_ENDPOINTS.PROJECT.SEARCH(title));
  }

  async createProject(data: ProjectCreateRequest): Promise<ApiResponse<Project>> {
    return await client.post<Project>(API_ENDPOINTS.PROJECT.CREATE, data);
  }

  async updateProject(id: string, data: ProjectUpdateRequest): Promise<ApiResponse<Project>> {
    return await client.put<Project>(API_ENDPOINTS.PROJECT.UPDATE(id), data);
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    return await client.delete<void>(API_ENDPOINTS.PROJECT.DELETE(id));
  }

  async likeProject(id: string): Promise<ApiResponse<Project>> {
    return await client.put<Project>(API_ENDPOINTS.PROJECT.LIKE(id));
  }

  async unlikeProject(id: string): Promise<ApiResponse<Project>> {
    return await client.put<Project>(API_ENDPOINTS.PROJECT.DISLIKE(id));
  }

  async commentProject(id: string, data: string): Promise<ApiResponse<Project>> {
    return await client.put<Project>(API_ENDPOINTS.PROJECT.COMMENT(id), { comment: data });
  }

  async shareProject(id: string): Promise<ApiResponse<Project>> {
    return await client.put<Project>(API_ENDPOINTS.PROJECT.SHARE(id));
  }


  async uploadProjectAvatar(
    file: string,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
    cancelToken?: CancelToken,
    timeout: number = 60000
  ): Promise<ApiResponse<string>> {

    return await client.uploadFile<string>(API_ENDPOINTS.PROJECT.UPLOAD, file, onUploadProgress, cancelToken, timeout);
  }

}

export const projectService = new ProjectService();
