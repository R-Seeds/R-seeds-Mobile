import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />
            <View className="absolute -top-20 -left-10 w-[200%] h-72 bg-teal-500 rotate-[-12deg]" />

            <View className="mt-48 items-center">
                <Image
                    source={require('@/assets/images/profile.jpg')}
                    className="w-32 h-32 rounded-full border-4 border-white"
                />
            </View>
            <View className="mt-4 w-full items-center">
                <Text className="font-bold text-xl">Hacker</Text>
                <Text className="text-teal-500">Rca Graduate</Text>
            </View>
            <ScrollView contentContainerClassName="gap-y-4 px-4">
                <View className="border-2 border-gray-300 flex-row items-center rounded-xl justify-between">
                    <View className="flex-col items-center  p-4 border-r border-gray-300">
                        <Text className="font-bold text-lg">$5000</Text>
                        <Text className="text-teal-500 font-semibold">Fund Raised</Text>
                    </View>
                    <View className="flex-col items-center  p-4 border-r border-gray-300">
                        <Text className="font-bold text-lg">8</Text>
                        <Text className="text-teal-500 font-semibold">Projects</Text>
                    </View>
                    <View className="flex-col items-center  p-4  border-gray-600">
                        <Text className="font-bold text-lg">10</Text>
                        <Text className="text-teal-500 font-semibold">Following</Text>
                    </View>
                </View>
                <View className="px-4">
                    <TouchableOpacity className="flex-row gap-x-2  items-center justify-between"
                        onPress={() => router.push('/project/myProject')}>
                        <View className="flex-row gap-x-2  items-center">
                            <FontAwesome name="gear" size={24} color="teal" />
                            <Text className="font-semibold">My Projects</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}