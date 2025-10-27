import { userService } from "@/services"
import { Graduate, Sponsor, User } from "@/types"
import { useAuth } from "./AuthContext"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface UserContextType {
    users: User[];
    graduates: Graduate[];
    sponsors: Sponsor[];
    currentUser: User | null;
    loading: boolean;
    fetchGraduates: () => Promise<void>;
    fetchSponsors: () => Promise<void>;
    fetchCurrentUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
    const {isAuthenticated}=useAuth()
    const [users, setUsers] = useState<User[]>([]);
    const [graduates, setGraduates] = useState<Graduate[]>([]);
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchGraduates = async () => {
        try {
            setLoading(true);
            const { data } = await userService.getGraduates();
            console.log("Graduates:", data);
            setGraduates(data);
        } catch (error: any) {
            console.error("Error fetching graduates:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSponsors = async () => {
        try {
            setLoading(true);
            const { data } = await userService.getSponsors();
            console.log("Sponsors:", data);
            setSponsors(data);
        } catch (error: any) {
            console.error("Error fetching sponsors:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            setLoading(true);
            const { data } = await userService.getMe();
            setCurrentUser(data);
        } catch (error: any) {
            console.error("Error fetching current user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(isAuthenticated){
            fetchGraduates();
            fetchSponsors();
            fetchCurrentUser();
        }
    }, [isAuthenticated]);

    return (
        <UserContext.Provider value={{ 
            users, 
            graduates, 
            sponsors, 
            currentUser, 
            loading,
            fetchGraduates,
            fetchSponsors,
            fetchCurrentUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        console.error("useUser must be used in a UserProvider")
        return
    }
    return context
}
