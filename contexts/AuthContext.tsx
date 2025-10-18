import { authService } from "@/services"
import { User, LoginRequest, SignupRequest } from "@/types"
import { createContext, useContext, useState } from "react"
import * as SecureStore from "expo-secure-store"
import { Alert } from "react-native"
import { router } from "expo-router"
import { useToast } from "@/contexts/ToastContext"

interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    loading: boolean
    setUser: (user: User | null) => void
    login: (request: LoginRequest) => Promise<void>
    register: (request: SignupRequest) => Promise<void>
    initializeAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { showToast } = useToast()
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const initializeAuth = async () => {
        try {
            const token = await SecureStore.getItemAsync("auth_token")
            console.log(token)
            if (token) {
                setIsAuthenticated(true)
                router.push('/dashboard/graduate')
            }else router.push('/auth/login')
            showToast({
                type: "success",
                title: "Success",
                message: "User authenticated successfully!"
            })
        } catch (error) {
            console.error(error)
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to authenticate user. Please try again."
            })
        } finally {
            setLoading(false)
        }
    }


    const login = async (request: LoginRequest) => {
        try {
            const response = await authService.login(request)
            if (!response.success) {
                Alert.alert("Error", response.message)
            }
            const token = response.data.token
            await SecureStore.setItemAsync('auth_token', token)
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    const register = async (request: SignupRequest) => {
        try {
            const response = await authService.signup(request)
            if (!response.success) {
                Alert.alert("Error", response.message)
            }
            const token = response.data.token
            await SecureStore.setItemAsync('auth_token', token)
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, setUser, login, register, initializeAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
