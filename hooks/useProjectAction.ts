import { projectService } from "@/services";
import { ProjectCreateRequest, ProjectUpdateRequest } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { router } from "expo-router";
import { useState } from "react";

export default function useProjectAction() {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    const createProject = async (data: ProjectCreateRequest) => {
        try {
            setLoading(true);
            console.log(data)
            const response = await projectService.createProject(data)
            console.log(response)
            showToast({
                type: "success",
                title: "Success",
                message: "Project created successfully!"
            });
            router.back();
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to create project. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    const updateProject = async (id: string | number, data: ProjectUpdateRequest) => {
        try {
            setLoading(true);

            console.log('updating project',data)
            const response = await projectService.updateProject(id, data);
      
            showToast({
                type: "success",
                title: "Success",
                message: "Project updated successfully!"
            });
            router.back();
        } catch (error) {
            console.error(error);
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to update project. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    return {
        createProject,
        updateProject,
        loading
    }

}