import { View, Image, Text } from "react-native";

export default function FundingProject() {
    return (
        <View className="w-full rounded-2xl overflow-hidden border-2 border-gray-300">
            <Image source={require('@/assets/auth/main.png')}
                className="w-full h-40"
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
            </View>
        </View>
    )
}