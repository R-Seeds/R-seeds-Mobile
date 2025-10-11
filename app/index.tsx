import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      className="h-full flex items-center justify-center"
    >
      <TouchableOpacity
        onPress={() => router.push('/auth')}
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
