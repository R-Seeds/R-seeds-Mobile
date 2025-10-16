import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";


export default function ProjectScreen() {
    return (
        <View className="flex-1 bg-white items-center">
            <TouchableOpacity className="absolute left-5 top-10 bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                onPress={() => router.back()}>
                <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center " />
            </TouchableOpacity>
            <Image source={require('@/assets/auth/main.png')}
                className="w-full h-[60%]"
                resizeMode="cover"
            />
            <ScrollView className="py-10 px-4 bg-white bottom-60 rounded-t-[50] flex-1 w-full"
                contentContainerClassName=" w-full flex-1 gap-y-4 ">
                <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-xl">Fin Tech</Text>
                    <Text className="text-black bg-teal-100 text-xs border border-teal-500  px-2 py-1 rounded-full">Agriculture</Text>
                </View>
                <View className="flex-col gap-y-2">
                    <View className="w-full border-4 rounded-full border-teal-500" />
                    <View className="flex-row justify-between">
                        <View className="flex-col gap-y-0">
                            <Text className="text-sm">Fund Raised</Text>
                            <Text className="font-bold text-lg">$1000</Text>
                        </View>
                        <View className="flex-col gap-y-0">
                            <Text className="text-sm">Target</Text>
                            <Text className="font-bold text-lg text-teal-500">$1000</Text>
                        </View>
                    </View>
                </View>
                <Text className="font-semibold">
                    SkyScout is an intelligent drone platform designed for aerial mapping,
                    surveillance, and delivery. Equipped with advanced sensors and GPS
                    navigation, SkyScout can capture real-time data from above, making
                    it valuable for agriculture, logistics, disaster management, and security.
                </Text>
                <View className="flex-row gap-x-2">
                    <View className="flex-1 flex-row gap-x-1 items-center">
                        <Text className="font-semibold text-teal-500 items-center">
                            Mission
                        </Text>
                        <Ionicons name="arrow-forward" size={15} color="black" />
                    </View>
                    <Text className="font-bold">
                        To provide reliable, versatile, and cost-effective drone
                        solutions that empower communities, businesses, and
                        organizations.
                    </Text>
                </View>
            </ScrollView>
            <TouchableOpacity className="absolute bottom-20  bg-teal-500 p-2 rounded-full">
                <Text className="text-white font-semibold">Contribute Now</Text>
            </TouchableOpacity>
        </View>
    )
}