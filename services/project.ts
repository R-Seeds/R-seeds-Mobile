import { GoalCreateRequest, Project, ProjectCreateRequest, TaskFinishRequest, ProjectOverview, ProjectStatistics, Task, TaskCreateRequest } from '@/types';
import { ApiResponse } from '@/types/api';
import { client } from './client';
import { API_ENDPOINTS } from './constants';

class ProjectService {
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return await client.get<Project[]>(API_ENDPOINTS.PROJECT.ALL);
  }

  async getProjectById(id: string | number): Promise<ApiResponse<Project>> {
    return await client.get<Project>(API_ENDPOINTS.PROJECT.BY_ID(id));
  }

  async createProject(data: ProjectCreateRequest): Promise<ApiResponse<Project>> {
    return await client.post<Project>(API_ENDPOINTS.PROJECT.CREATE, data);
  }


  async deleteProject(id: string | number): Promise<ApiResponse<void>> {
    return await client.delete<void>(API_ENDPOINTS.PROJECT.DELETE(id));
  }

  async getProjectStatistics(): Promise<ApiResponse<ProjectStatistics>> {
    return await client.get<ProjectStatistics>(API_ENDPOINTS.PROJECT.STATISTICS);
  }

  async getProjectOverview(): Promise<ApiResponse<ProjectOverview>> {
    return await client.get<ProjectOverview>(API_ENDPOINTS.PROJECT.OVERVIEW);
  }
  async createGoal(goalRequest: GoalCreateRequest): Promise<ApiResponse<Project>> {
    return await client.post<Project>(API_ENDPOINTS.PROJECT.GOAL.CREATE, goalRequest);
  }

  async createTask(taskRequest: TaskCreateRequest): Promise<ApiResponse<Project>> {
    return await client.post<Project>(API_ENDPOINTS.PROJECT.TASK.CREATE, taskRequest)
  }

  async finishTask(id: string, request: TaskFinishRequest): Promise<ApiResponse<Project>> {
    console.log("this is the end", request)
    return await client.put<Project>(API_ENDPOINTS.PROJECT.TASK.DONE(id), request);
  }
}

export const projectService = new ProjectService();
