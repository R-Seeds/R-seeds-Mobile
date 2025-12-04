import { userService } from "@/services"
import { Graduate, Project, Sponsor, User, UserType } from "@/types"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

interface UserContextType {
    users: User[]
    savedProjects: Project[]
    graduates: Graduate[]
    sponsors: Sponsor[]
    currentUser: User | null
    loading: boolean
    userMe: User | null
    sponsorMe: Sponsor | null
    graduateMe: Graduate | null
    fetchGraduates: () => Promise<void>
    fetchSponsors: () => Promise<void>
    fetchCurrentUser: () => Promise<void>
    updateGraduate: (data: number) => void
    updateSponsor: (data: number) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated, userType } = useAuth()
    const [userMe, setUserMe] = useState<User | null>(null)
    const [sponsorMe, setSponsorMe] = useState<Sponsor | null>(null)
    const [graduateMe, setGraduateMe] = useState<Graduate | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [graduates, setGraduates] = useState<Graduate[]>([])
    const [sponsors, setSponsors] = useState<Sponsor[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    const [savedProjects, setSavedProjects] = useState<Project[]>([])
    const fetchGraduates = async () => {
        try {
            setLoading(true)
            const { data } = await userService.getGraduates()
            setGraduates(data)
        } catch (error: any) {
            console.error("Error fetching graduates:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSponsors = async () => {
        try {
            setLoading(true)
            const { data } = await userService.getSponsors()
            setSponsors(data)
        } catch (error: any) {
            console.error("Error fetching sponsors:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCurrentUser = async () => {
        try {
            setLoading(true)
            const { data } = await userService.getMe()
            setCurrentUser(data)
        } catch (error: any) {
            console.error("Error fetching current user:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUserMe = async () => {
        try {
            setLoading(true)
            const { data } = await userService.getMe()
            setUserMe(data)
        } catch (error: any) {
            console.error("Error fetching user me:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSponsorMe = async () => {
        try {
            setLoading(true)
            const { data } = await userService.getMySponsor()
            setSponsorMe(data)
        } catch (error: any) {
            console.error("Error fetching sponsor me:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchGraduateMe = async () => {
        try {
            setLoading(true)
            const { data } = await userService.getMyGraduate()
            setGraduateMe(data)
        } catch (error: any) {
            console.error("Error fetching graduate me:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSavedProjects = async () => {
        try {
            setLoading(true)
            const { data } = await userService.getSavedProjects()
            setSavedProjects(data)
        } catch (error: any) {
            console.error("Error fetching saved projects:", error)
        } finally {
            setLoading(false)
        }
    }
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const { data } = await userService.getAllUsers()
            setUsers(data)
        } catch (error: any) {
            console.error("Error fetching users:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateGraduate = (data: number) => {
        setGraduateMe(prev => (prev ? { ...prev, totalProjects: prev.totalProjects + data } : null))
    }

    const updateSponsor = (data: number) => {
        setSponsorMe(prev => (prev ? { ...prev, totalFunded: prev.totalFunded + data } : null))
    }


    useEffect(() => {
        if (isAuthenticated) {
            fetchUsers()
            fetchGraduates()
            fetchSponsors()
            fetchCurrentUser()
            fetchUserMe()
            if (userType === UserType.SPONSOR) fetchSponsorMe()
            if (userType === UserType.GRADUATE) fetchGraduateMe()
            fetchSavedProjects()
        }
    }, [isAuthenticated, userType])

    return (
        <UserContext.Provider value={{
            updateGraduate,
            updateSponsor,
            users,
            graduates,
            sponsors,
            currentUser,
            loading,
            savedProjects,
            fetchGraduates,
            fetchSponsors,
            fetchCurrentUser,
            userMe,
            sponsorMe,
            graduateMe
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}
