import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, TouchableOpacity, Text, TextInput, Image } from "react-native";

export default function CreateProjectScreen() {
    return (
        <View className="flex-1">
            <TouchableOpacity className="absolute left-5 top-10 bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                onPress={() => router.back()}>
                <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center " />
            </TouchableOpacity>
        </View>
    )
}