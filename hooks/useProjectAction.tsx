import { projectService } from "@/services";
import { Project, ProjectCreateRequest } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { router } from "expo-router";
import { useState } from "react";

export default function useProjectAction() {
    const { showSuccess, showError } = useToast();
    const [loading, setLoading] = useState(false);

    const createProject = async (data: ProjectCreateRequest) => {
        try {
            setLoading(true);
            console.log(data)
            const response = await projectService.createProject(data)
            console.log(response)
            showSuccess("Success", "Project created successfully!");
            router.back();
        } catch (error) {
            console.error(error)
            showError("Error", "Failed to create project. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const updateProject = async (id: string | number, data: ProjectCreateRequest) => {
        try {
            setLoading(true);
            const response = await projectService.updateProject(id, data);
            console.log(response);
            showSuccess("Success", "Project updated successfully!");
            router.back();
        } catch (error) {
            console.error(error);
            showError("Error", "Failed to update project. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const getProject = async (id: string | number): Promise<Project | null> => {
        try {
            const response = await projectService.getProjectById(id);
            return response.data;
        } catch (error) {
            console.error(error);
            showError("Error", "Failed to load project details.");
            return null;
        }
    }

    return {
        createProject,
        updateProject,
        getProject,
        loading
    }

}