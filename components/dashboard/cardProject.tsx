import { View, Text, TouchableOpacity, Image } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from "expo-router";
import { Project } from "@/types";
import { useProjects } from "@/contexts/ProjectContext";

export default function CardProject({ project }: { project: Project }) {
    const { setCurrentProject } = useProjects()
    return (
        <View className=" w-full items-center border border-gray-300 rounded-2xl ">
            <View className="flex-row justify-between items-center p-4 w-full ">
                <View className="flex-row  items-center gap-x-2">
                    <Image source={{ uri: project.logo }}
                        resizeMode="cover"
                        className="w-10 h-10 rounded-full " />
                    <Text className="text-lg font-bold">{project.title}</Text>
                </View>
                <TouchableOpacity className="">
                    <Entypo name="dots-three-horizontal" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: project.logo }}
                resizeMode="cover"
                className="w-full h-96 rounded-2xl " />
            <View className="items-center flex-row gap-x-6 bg-white rounded-2xl bottom-10 p-4">
                <TouchableOpacity className="items-center flex-col gap-y-2">
                    <Entypo name="heart-outlined" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">{project.interaction.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2">
                    <Ionicons name="chatbubble-outline" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">{project.interaction.comments.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2">
                    <FontAwesome6 name="bookmark" size={24} color="white" className="bg-teal-500 p-1 rounded-full h-10 w-10 text-center" />
                    <Text className="text-sm text-teal-500 font-semibold">0</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2">
                    <Entypo name="forward" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">{project.interaction.shares}</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full px-4 gap-y-4 bottom-10">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-semibold">{project.title}</Text>
                    <View className="gap-x-2 flex-row">
                        <EvilIcons name="eye" size={24} color="black" />
                        <Text className="text-sm text-gray-500 font-semibold">{project.interaction.views} Views</Text>
                    </View>
                </View>
                <Text className="text-sm text-black ">
                    {project.description}
                </Text>
                <Text className="text-sm text-black font-semibold">
                    Raised ${project.fundingInfo.raised} of {project.fundingInfo.goal}
                </Text>
            </View>
            <View className="flex-row justify-between items-center gap-x-10 px-4 pb-4">
                <TouchableOpacity className="border flex-1 border-teal-500 px-4 py-2 rounded-xl items-center"
                    onPress={() => { setCurrentProject(project); router.push('/project/spotlight') }}>
                    <Text className="text-teal-500 font-semibold">View Project</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-teal-500 flex-1 px-4 py-2 rounded-xl items-center">
                    <Text className="text-white font-semibold">Follow</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}