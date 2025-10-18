import { Project } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function MyProject({ project }: { project: Project }) {
    return (
        <View className="w-full rounded-2xl overflow-hidden border-2 border-gray-300 flex-row">
            <Image source={require('@/assets/auth/main.png')}
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
        </View>
    )
}