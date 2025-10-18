import { Stack } from "expo-router";
import '../global.css'
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ProjectProvider } from "@/contexts/ProjectContext";


export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProjectProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ProjectProvider>
      </UserProvider>
    </AuthProvider>)
}
