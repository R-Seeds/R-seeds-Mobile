import { Ionicons } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function FundingProject() {
    return (
        <View className="w-full rounded-2xl overflow-hidden border-2 border-gray-300">
            <Image source={require('@/assets/auth/main.png')}
                className="w-full h-36"
                resizeMode="cover" />
            <View className="p-4 items-center gap-y-2">
                <View className="flex-row justify-between items-center w-full">
                    <Text className="font-bold text-lg">FinTech</Text>
                    <Text className="text-teal-700 font-semibold bg-teal-100 text-xs border border-teal-500  px-2 py-1 rounded-full">Active</Text>
                </View>
                <View className="flex-row justify-between items-center w-full">
                    <View className="flex-row gap-x-1">
                        <Text className="text-black font-bold">Donors:</Text>
                        <Text className="text-teal-500 font-bold">25</Text>
                    </View>
                    <View className="flex-row gap-x-1">
                        <Text className="text-black font-semibold">Raised:</Text>
                        <Text className="text-teal-500 font-bold">$5,000</Text>
                        <Text className="text-black font-semibold">of $10,000</Text>
                    </View>
                </View>
                <View className="border-4 border-teal-500 w-full rounded-full" />
                <Text className="text-right w-full text-teal-500 font-semibold">85%</Text>
                <View className="items-start w-full bottom-5">
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