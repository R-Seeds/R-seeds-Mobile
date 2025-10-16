import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { initializeAuth } = useAuth()
  useEffect(() => {
    initializeAuth()
  }, [])
  return (
    <View className="h-full flex items-center justify-center"    >
      <View>
        <Text>Loading...</Text>
      </View>
    </View>
  );
}
