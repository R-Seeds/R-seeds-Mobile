import { createContext, ReactNode, useContext } from "react";

interface ProjectContextType {

}

const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
    return (
        <ProjectContext.Provider value={{}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjects() {
    const context = useContext(ProjectContext)
    if (!context) {
        console.error("useProject must be used in a ProjectProvider")
    }
    return context
}