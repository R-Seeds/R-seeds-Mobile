import { projectService } from "@/services";
import { ProjectCreateRequest, ProjectUpdateRequest } from "@/types";
import { useToast } from "@/contexts/ToastContext";
import { router } from "expo-router";
import { useState } from "react";
import { share } from "@/lib/share";
import { useProjects } from "@/contexts/ProjectContext";

export default function useProjectAction() {
    const { addProject, updateProject: editProject, deleteProject } = useProjects()
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    const createProject = async (data: ProjectCreateRequest) => {
        try {
            setLoading(true);
            const response = await projectService.createProject(data)
            if (!response.success || !response.data) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to create project. Please try again."
                });
                return
            }
            showToast({
                type: "success",
                title: "Success",
                message: "Project created successfully!"
            });
            addProject(response.data)
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

    const updateProject = async (id: string, data: ProjectUpdateRequest) => {
        try {
            setLoading(true);

            console.log('updating project', data)
            const response = await projectService.updateProject(id, data);
  if (!response.success || !response.data) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to create project. Please try again."
                });
                return
            }
            showToast({
                type: "success",
                title: "Success",
                message: "Project updated successfully!"
            });
                editProject(response.data)
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

    const likeProject = async (id: string) => {
        try {
            setLoading(true);
            const response = await projectService.likeProject(id)
              if (!response.success || !response.data) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to create project. Please try again."
                });
                return
            }
            showToast({
                type: "success",
                title: "Success",
                message: "Project liked successfully!"
            });
            editProject(response.data)
            router.back();
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to like project. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    const unlikeProject = async (id: string) => {
        try {
            setLoading(true);
            const response = await projectService.unlikeProject(id)
              if (!response.success || !response.data) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to create project. Please try again."
                });
                return
            }
            showToast({
                type: "success",
                title: "Success",
                message: "Project unliked successfully!"
            });
                            editProject(response.data)

            router.back();
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to unlike project. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    const commentProject = async (id: string, data: string) => {
        try {
            setLoading(true);
            const response = await projectService.commentProject(id, data)
              if (!response.success || !response.data) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to create project. Please try again."
                });
                return
            }
            showToast({
                type: "success",
                title: "Success",
                message: "Project commented successfully!"
            });
                            editProject(response.data)

            router.back();
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to comment project. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    const shareProject = async (id: string) => {
        try {
            setLoading(true);
            await share(id)

            const response = await projectService.shareProject(id)
              if (!response.success || !response.data) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to create project. Please try again."
                });
                return
            }
            // projectToLinkData(id)
            showToast({
                type: "success",
                title: "Success",
                message: "Project shared successfully!"
            });
                            editProject(response.data)

            router.back();
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to share project. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    const addDonor = async (id: string, data: string) => {
        try {
            setLoading(true);
            const response = await projectService.addDonor(id, data)
              if (!response.success || !response.data) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to create project. Please try again."
                });
                return
            }
            showToast({
                type: "success",
                title: "Success",
                message: "Project donor added successfully!"
            });
                            editProject(response.data)

            router.back();
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to add donor. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    return {
        createProject,
        updateProject,
        loading,
        likeProject,
        unlikeProject,
        commentProject,
        shareProject,
        addDonor
    }

}