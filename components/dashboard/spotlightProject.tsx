import { Image, Text, View } from "react-native";
import { Project } from "@/types";

export default function SpotlightProject({project}:{project:Project}) {
    return (
        <View className="gap-y-1 items-center ">
            <Image source={{ uri: project.logo }}
                resizeMode="cover"
                className="w-28 h-36 rounded-xl border-2 border-teal-500" />
                <Text className=" text-gray-500 font-semibold">{project.title}</Text>
        </View>
    )
}