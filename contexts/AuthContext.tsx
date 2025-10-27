import { authService } from "@/services"
import { User, LoginRequest, SignupRequest, UserType, GoogleAuthRequest } from "@/types"
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
    logout: () => Promise<void>
    googleRegister: (request: GoogleAuthRequest) => Promise<void>
    googleLogin: (request: string) => Promise<void>
    userType: UserType
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { showToast } = useToast()
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userType, setUserType] = useState<UserType>(UserType.USER)

    const initializeAuth = async () => {
        try {
            const token = await SecureStore.getItemAsync("auth_token")
            const data = await SecureStore.getItemAsync("user")
            const user = JSON.parse(data!) as User
            console.log(token,data)
            if (token && user) {
                setIsAuthenticated(true)
                setUser(user)
                setUserType(user.role)
                router.push('/dashboard')
            } else router.push('/auth')

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
            setLoading(true)
            const response = await authService.login(request)
            if (!response.success) {
                Alert.alert("Error", response.message)
                return
            }
            const token = response.data.token
            await SecureStore.setItemAsync('auth_token', token)
            await SecureStore.setItemAsync('user', JSON.stringify(response.data.user))
            router.push('/')
        } catch (error) {
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to authenticate user. Please try again."
            })
        } finally {
            setLoading(false)
        }
    }

    const register = async (request: SignupRequest) => {
        try {
            setLoading(true)

            const response = await authService.signup(request)
            if (!response.success) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to authenticate user. Please try again."
                })
                return
            }
            const token = response.data.token
            await SecureStore.setItemAsync('auth_token', token)
            await SecureStore.setItemAsync('user', JSON.stringify(response.data.user))

            router.push('/')
        } catch (error) {
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to authenticate user. Please try again."
            })
        } finally {
            setLoading(false)
        }
    }

    const googleRegister = async (request: GoogleAuthRequest) => {
        try {
            console.log(request)
            setLoading(true)
            const response = await authService.googleRegister(request)
            if (!response.success) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to authenticate user. Please try again."
                })
                return
            }
            const token = response.data.token
            await SecureStore.setItemAsync('auth_token', token)
            await SecureStore.setItemAsync('user', JSON.stringify(response.data.user))
            router.push('/')
        } catch (error) {
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to authenticate user. Please try again."
            })
        } finally {
            setLoading(false)
        }
    }

    const googleLogin = async (request: string) => {
        try {
            setLoading(true)

            const response = await authService.googleLogin(request)
            if (!response.success) {
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Failed to authenticate user. Please try again."
                })
                return
            }
            console.log(response.data)
            const token = response.data.token
            await SecureStore.setItemAsync('auth_token', token)
            await SecureStore.setItemAsync('user', JSON.stringify(response.data.user))
            router.push('/')
        } catch (error) {
            console.log(error)
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to authenticate user. Please try again."
            })
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('auth_token')
            await SecureStore.deleteItemAsync('user')
            setIsAuthenticated(false)
            setUser(null)
            router.push('/auth')
        } catch (error) {
            showToast({
                type: "error",
                title: "Error",
                message: "Failed to authenticate user. Please try again."
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            loading,
            setUser,
            login,
            register,
            initializeAuth,
            logout,
            userType,
            googleRegister,
            googleLogin
        }}>
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
