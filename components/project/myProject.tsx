import { useProjects } from "@/contexts/ProjectContext";
import { Project } from "@/types";
import { router } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function MyProject({ project }: { project: Project }) {
    const { setCurrentProject } = useProjects()
    return (
        <TouchableOpacity className="w-full rounded-2xl overflow-hidden border-2 border-gray-300 flex-row"
        onPress={()=>{setCurrentProject(project);router.push('/project/detail')}}>
            <Image source={{ uri: project.logo }}
                className="w-32 h-full"
                resizeMode="cover" />

            <View className="p-4 items-center gap-y-2 flex-1">
                <View className="flex-col  items-start w-full gap-y-2">
                    <Text className="font-bold text-lg text-teal-500">{project.title}</Text>
                    <Text className=" font-semibold text-sm">
                        {project.description}
                    </Text>

                    <View className="flex-row gap-x-1">
                        <Text className="text-black font-semibold">Raised:</Text>
                        <Text className="text-teal-500 font-bold">{project.fundingInfo.raised}</Text>
                        <Text className="text-black font-semibold">of {project.fundingInfo.goal}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}