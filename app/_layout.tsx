import { Stack } from "expo-router";
import '../global.css'
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <ChatProvider>
          <AuthProvider>
            <UserProvider>
              <ProjectProvider>
                <Stack screenOptions={{ headerShown: false }} />
              </ProjectProvider>
            </UserProvider>
          </AuthProvider>
        </ChatProvider>
      </ToastProvider>
    </SafeAreaProvider>)
}
