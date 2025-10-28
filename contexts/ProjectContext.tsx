import { createContext, ReactNode, useContext, useState, useEffect, useMemo } from "react"
import { Project, ProjectCategory, ProjectStatus } from "@/types"
import { projectService } from "@/services"
import { useAuth } from "./AuthContext"
import { useToast } from "./ToastContext"

interface ProjectContextType {
    projects: Project[]
    filteredProjects: Project[]
    myProjects: Project[]
    trendingProjects: Project[]
    spotlightProjects: Project[]
    currentProject: Project | null
    selectedCategory: ProjectCategory | null
    selectedStatus: ProjectStatus | null
    loading: boolean
    findById: (id: string) => Promise<void>
    setCurrentProject: (project: Project | null) => void
    setSelectedCategory: (category: ProjectCategory | null) => void
    setSelectedStatus: (status: ProjectStatus | null) => void
    clearFilter: () => void
    clearStatusFilter: () => void
    fetchProjects: () => Promise<void>
    fetchMyProjects: () => Promise<void>
    fetchTrendingProjects: () => Promise<void>
    fetchProjectsByCategory: (category: string) => Promise<void>
    fetchProjectsByStatus: (status: string) => Promise<void>
    searchProjects: (title: string) => Promise<void>
    addProject: (project: Project) => void
    updateProject: (project: Project) => void
    deleteProject: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
    const { showToast } = useToast()
    const { isAuthenticated } = useAuth()
    const [projects, setProjects] = useState<Project[]>([])
    const [myProjects, setMyProjects] = useState<Project[]>([])
    const [trendingProjects, setTrendingProjects] = useState<Project[]>([])
    const [spotlightProjects, setSpotlightProjects] = useState<Project[]>([])
    const [currentProject, setCurrentProject] = useState<Project | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | null>(null)
    const [loading, setLoading] = useState(false)

    // Filter projects based on selected category and status
    const filteredProjects = useMemo(() => {
        let filtered = projects

        // Filter by category if selected
        if (selectedCategory) {
            filtered = filtered.filter(project => {
                const projectCategory = project.category

                // Direct comparison (for numeric enum values)
                if (projectCategory === selectedCategory) {
                    return true
                }

                // String to enum comparison (backend sends strings like "FINANCE")
                if (typeof projectCategory === 'string' && typeof selectedCategory === 'number') {
                    const enumKey = ProjectCategory[selectedCategory] as string
                    return projectCategory === enumKey
                }

                // Number string to enum comparison (backend sends "2")
                if (typeof projectCategory === 'string' && !isNaN(Number(projectCategory))) {
                    return Number(projectCategory) === selectedCategory
                }

                return false
            })
        }

        // Filter by status if selected
        if (selectedStatus) {
            filtered = filtered.filter(project => {
                return project.status === selectedStatus
            })
        }

        return filtered
    }, [projects, selectedCategory, selectedStatus])

    // Clear filter functions
    const clearFilter = () => {
        setSelectedCategory(null)
    }

    const clearStatusFilter = () => {
        setSelectedStatus(null)
    }

    const fetchProjects = async () => {
        try {
            setLoading(true)
            const { data } = await projectService.getProjects()
            setProjects(data)
        } catch (error: any) {
            console.error("Error fetching projects:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchMyProjects = async () => {
        try {
            setLoading(true)
            const { data } = await projectService.getMyProjects()
            setMyProjects(data)
        } catch (error: any) {
            console.error("Error fetching my projects:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSpotlighProjects = async () => {
        try {
            setLoading(true)
            const { data } = await projectService.getSpotlightProjects()
            setSpotlightProjects(data)
        } catch (error: any) {
            console.error("Error fetching spotlight projects:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchTrendingProjects = async () => {
        try {
            setLoading(true)
            const { data } = await projectService.getTrendingProjects()
            setTrendingProjects(data)
        } catch (error: any) {
            console.error("Error fetching trending projects:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchProjectsByCategory = async (category: string) => {
        try {
            setLoading(true)
            const { data } = await projectService.getProjectsByCategory(category)
            setProjects(data)
        } catch (error: any) {
            console.error("Error fetching projects by category:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchProjectsByStatus = async (status: string) => {
        try {
            setLoading(true)
            const { data } = await projectService.getProjectsByStatus(status)
            setProjects(data)
        } catch (error: any) {
            console.error("Error fetching projects by status:", error)
        } finally {
            setLoading(false)
        }
    }

    const searchProjects = async (title: string) => {
        try {
            setLoading(true)
            const { data } = await projectService.searchProjects(title)
            setProjects(data)
        } catch (error: any) {
            console.error("Error searching projects:", error)
        } finally {
            setLoading(false)
        }
    }

    const findById = async (id: string) => {
        try {
            console.log('loading project of ours', id)
            setLoading(true)
            const response = await projectService.getProjectById(id)
            console.log('project of ours', response)
            if (!response.success || !response.data) {
                showToast({
                    title: "Error",
                    message: "Failed to find project",
                    type: "error"
                })
                return
            }
            const project = response.data
            setCurrentProject(project)
        } catch (error) {
            showToast({
                title: "Error",
                message: "Failed to find project",
                type: "error"
            })
        } finally {
            setLoading(false)
        }
    }

    const addProject = (project: Project) => {
        setMyProjects(prev => [...prev, project])
        setProjects(prev => [...prev, project])
    }

    const updateProject = (project: Project) => {
        setMyProjects(prev => prev.map(p => project.id === project.id ? project : p))
        setProjects(prev => prev.map(p => project.id === project.id ? project : p))
    }

    const deleteProject = (id: string) => {
        setMyProjects(prev => prev.filter(p => p.id !== id))
        setProjects(prev => prev.filter(p => p.id !== id))
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchProjects()
            fetchTrendingProjects()
            fetchSpotlighProjects()
            fetchMyProjects()
        }
    }, [isAuthenticated])

    return (
        <ProjectContext.Provider value={{
            findById,
            projects,
            filteredProjects,
            myProjects,
            trendingProjects,
            spotlightProjects,
            currentProject,
            selectedCategory,
            selectedStatus,
            loading,
            setCurrentProject,
            setSelectedCategory,
            setSelectedStatus,
            clearFilter,
            clearStatusFilter,
            fetchProjects,
            fetchMyProjects,
            fetchTrendingProjects,
            fetchProjectsByCategory,
            fetchProjectsByStatus,
            searchProjects,
            addProject,
            updateProject,
            deleteProject
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects(): ProjectContextType {
    const context = useContext(ProjectContext)
    if (!context) {
        throw new Error("useProject must be used in a ProjectProvider")

    }
    return context
}