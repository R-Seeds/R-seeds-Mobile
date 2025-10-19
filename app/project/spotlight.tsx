import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useProjects } from "@/contexts/ProjectContext";
import { StatusBar } from "expo-status-bar";

export default function SpotlightProject() {
    const { currentProject } = useProjects()
    return (
        <View className="flex-1 items-center bg-white">
            <StatusBar style="light" />
            <TouchableOpacity className="absolute left-5 top-10 bg-gray-300/30 rounded-full z-10 p-2"
                onPress={() => router.back()}>
                <Ionicons name="close" color={'white'} size={25} />
            </TouchableOpacity>
            <Image source={{ uri: currentProject?.logo }}
                className="w-full h-[70%]"
                resizeMode="cover"
            />
            <View className="flex-row px-4">
                <View className="flex-1 p-4 gap-y-4">
                    <Text className="text-2xl font-semibold border-b pb-2">{currentProject?.title}</Text>
                    <Text className="text-sm font-semibold">{currentProject?.description}</Text>
                </View>
                <View className="items-center">
                    <Image source={{ uri: currentProject?.logo }}
                        className="w-24 h-24 rounded-full p-4 bg-white bottom-10 border-4 border-white"
                        resizeMode="cover"
                    />
                    <TouchableOpacity className="flex-row gap-x-2 bg-white p-1 rounded-full items-center border border-teal-500"
                        onPress={() => router.push('/project/detail')}>
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