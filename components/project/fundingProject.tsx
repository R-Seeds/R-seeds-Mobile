import { Ionicons } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useProjects } from "@/contexts/ProjectContext";
import { Project } from "@/types";
import { router } from "expo-router";

export default function FundingProject({ project }: { project: Project }) {
    const { setCurrentProject } = useProjects()

    const progress = project.fundingInfo.raised / project.fundingInfo.goal
    return (
        <View className="w-full rounded-2xl overflow-hidden border-2 border-gray-300">
            <Image source={require('@/assets/auth/main.png')}
                className="w-full h-36"
                resizeMode="cover" />
            <View className="p-4 items-center gap-y-2">
                <View className="flex-row justify-between items-center w-full">
                    <Text className="font-bold text-lg">{project.title}</Text>
                    <Text className="text-teal-700 font-semibold bg-teal-100 text-xs border border-teal-500  px-2 py-1 rounded-full">Active</Text>
                </View>
                <View className="flex-row justify-between items-center w-full">
                    <View className="flex-row gap-x-1">
                        <Text className="text-black font-bold">Donors:</Text>
                        <Text className="text-teal-500 font-bold">{project.fundingInfo.donors}</Text>
                    </View>
                    <View className="flex-row gap-x-1">
                        <Text className="text-black font-semibold">Raised:</Text>
                        <Text className="text-teal-500 font-bold">{project.fundingInfo.raised}</Text>
                        <Text className="text-black font-semibold">of {project.fundingInfo.goal}</Text>
                    </View>
                </View>
                <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-50">
                    <View
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${Math.min(progress * 100, 100)}%` }}
                    />
                </View>

                <Text className="text-right w-full text-teal-500 font-semibold">{Math.round(progress * 100)}%</Text>
                <View className="items-start w-full bottom-5">
                    <TouchableOpacity className="flex-row gap-x-2 bg-white p-1 rounded-full items-center border border-teal-500"
                        onPress={() => {setCurrentProject(project);router.push('/project/detail')}}>
                    <View className="flex-row gap-x-2 bg-teal-500 pl-4 pr-1 py-1 rounded-full">
                        <Text className="text-white text-sm font-semibold">View Project</Text>
                        <Ionicons name="arrow-forward" size={15} color={'teal'} className="bg-white p-1 rounded-full" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </View >
    )
}