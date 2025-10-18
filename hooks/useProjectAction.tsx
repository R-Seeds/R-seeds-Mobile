import { projectService } from "@/services";
import { ProjectCreateRequest } from "@/types";

export default function useProjectAction() {

    const createProject =async (data: ProjectCreateRequest) => {
        try {
            console.log(data)
            const response =await projectService.createProject(data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        createProject
    }

}