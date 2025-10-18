import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Project } from "@/types";
import { projectService } from "@/services";
import { router } from "expo-router";

interface ProjectContextType {
    projects: Project[];
    myProjects: Project[];
    trendingProjects: Project[];
    spotlightProjects: Project[];
    currentProject: Project | null;
    loading: boolean;
    setCurrentProject: (project: Project | null) => void;
    fetchProjects: () => Promise<void>;
    fetchMyProjects: () => Promise<void>;
    fetchTrendingProjects: () => Promise<void>;
    fetchProjectsByCategory: (category: string) => Promise<void>;
    fetchProjectsByStatus: (status: string) => Promise<void>;
    searchProjects: (title: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [myProjects, setMyProjects] = useState<Project[]>([]);
    const [trendingProjects, setTrendingProjects] = useState<Project[]>([]);
    const [spotlightProjects, setSpotlightProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data } = await projectService.getProjects();
            setProjects(data);
        } catch (error: any) {
            console.error("Error fetching projects:", error);
            if (error.status === 401) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchMyProjects = async () => {
        try {
            setLoading(true);
            const { data } = await projectService.getMyProjects();
            setMyProjects(data);
        } catch (error: any) {
            console.error("Error fetching my projects:", error);
            if (error.status === 401) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchSpotlighProjects=async()=>{
        try {
            setLoading(true);
            const { data } = await projectService.getSpotlightProjects();
            setSpotlightProjects(data);
        } catch (error: any) {
            console.error("Error fetching spotlight projects:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchTrendingProjects = async () => {
        try {
            setLoading(true);
            const { data } = await projectService.getTrendingProjects();
            setTrendingProjects(data);
        } catch (error: any) {
            console.error("Error fetching trending projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProjectsByCategory = async (category: string) => {
        try {
            setLoading(true);
            const { data } = await projectService.getProjectsByCategory(category);
            setProjects(data);
        } catch (error: any) {
            console.error("Error fetching projects by category:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProjectsByStatus = async (status: string) => {
        try {
            setLoading(true);
            const { data } = await projectService.getProjectsByStatus(status);
            setProjects(data);
        } catch (error: any) {
            console.error("Error fetching projects by status:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchProjects = async (title: string) => {
        try {
            setLoading(true);
            const { data } = await projectService.searchProjects(title);
            setProjects(data);
        } catch (error: any) {
            console.error("Error searching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchTrendingProjects();
        fetchSpotlighProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ 
            projects, 
            myProjects,
            trendingProjects,
            spotlightProjects,
            currentProject, 
            loading,
            setCurrentProject,
            fetchProjects,
            fetchMyProjects,
            fetchTrendingProjects,
            fetchProjectsByCategory,
            fetchProjectsByStatus,
            searchProjects
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects():ProjectContextType {
    const context = useContext(ProjectContext)
    if (!context) {
        throw new Error("useProject must be used in a ProjectProvider")
      
    }
    return context
}