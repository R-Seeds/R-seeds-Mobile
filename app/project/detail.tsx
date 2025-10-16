import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";


export default function ProjectScreen() {
    return (
        <View className="flex-1 bg-white">
            <TouchableOpacity className="absolute left-5 top-10 bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                onPress={() => router.back()}>
                <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center " />
            </TouchableOpacity>
            <Image source={require('@/assets/auth/main.png')}
                className="w-full h-[60%]"
                resizeMode="cover"
            />
            <ScrollView className="p-5 bg-white bottom-60 rounded-t-[50] flex-1"
                contentContainerClassName="bg-black flex-1">

            </ScrollView>
            <TouchableOpacity className="absolute bottom-5 right-5 bg-teal-500 p-2 rounded-full">
                <Text className="text-white font-semibold">Contribute Now</Text>
            </TouchableOpacity>
        </View>
    )
}