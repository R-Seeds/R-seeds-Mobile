import { Stack } from "expo-router";
import '../global.css'
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { LinksProvider } from "@/contexts/LinksContext";


export default function RootLayout() {
  return (
    <ToastProvider>

      <AuthProvider>
        <ProjectProvider>
          <LinksProvider>
            <ChatProvider>
              <UserProvider>
                <Stack screenOptions={{ headerShown: false }} />
              </UserProvider>
            </ChatProvider>
          </LinksProvider>
        </ProjectProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
