import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function SpotlightProject() {
    return (
        <View className="flex-1 items-center bg-white">
            <Image source={require('@/assets/auth/main.png')}
                className="w-full h-[70%]"
                resizeMode="cover"
            />
            <View className="flex-row px-4">
                <View className="flex-1 p-4 gap-y-4">
                    <Text className="text-2xl font-semibold border-b pb-2">Smart Nexus</Text>
                    <Text className="text-sm font-semibold">A centralized system that automates and
                        controls home lighting, temperature, and
                        security from one smart panel.</Text>
                </View>
                <View className="items-center">

                    <Image source={require('@/assets/auth/main.png')}
                        className="w-24 h-24 rounded-full p-4 bg-white bottom-10 border-4 border-white"
                        resizeMode="cover"
                    />
                    <TouchableOpacity className="flex-row gap-x-2 bg-white p-1 rounded-full items-center border border-teal-500">
                        <View className="flex-row gap-x-2 bg-teal-500 pl-4 pr-1 py-1 rounded-full">
                            <Text className="text-white text-sm font-semibold">View Project</Text>
                            <Ionicons name="arrow-forward" size={15} color={'teal'} className="bg-white p-1 rounded-full" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}