import { Stack } from "expo-router";
import '../global.css'
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { ToastProvider } from "@/contexts/ToastContext";


export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <UserProvider>
          <ProjectProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ProjectProvider>
        </UserProvider>
      </AuthProvider>
    </ToastProvider>)
}
