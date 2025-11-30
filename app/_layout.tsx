import { Stack } from "expo-router";
import '../global.css'
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ChatProvider } from "@/contexts/ChatContext";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";


export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden')
  }, []);
  return (
    <ToastProvider>

      <AuthProvider>
        <ProjectProvider>
          <ChatProvider>
            <UserProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </UserProvider>
          </ChatProvider>
        </ProjectProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
