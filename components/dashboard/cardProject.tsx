import { View, Text, TouchableOpacity, Image } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function CardProject() {
    return (
        <View className=" w-full items-center border border-gray-300 rounded-2xl ">
            <View className="flex-row justify-between items-center p-4 w-full ">
                <View className="flex-row  items-center gap-x-2">
                    <Image source={require("@/assets/auth/main.png")}
                        resizeMode="cover"
                        className="w-10 h-10 rounded-full " />
                    <Text className="text-lg font-bold">FinTech</Text>
                </View>
                <TouchableOpacity className="">
                    <Entypo name="dots-three-horizontal" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <Image source={require("@/assets/auth/main.png")}
                resizeMode="cover"
                className="w-full h-96 rounded-2xl " />
            <View className="items-center flex-row gap-x-6 bg-white rounded-2xl bottom-10 p-4">
                <TouchableOpacity className="items-center flex-col gap-y-2">
                    <Entypo name="heart-outlined" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">123k</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2">
                    <Ionicons name="chatbubble-outline" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">123k</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2">
                    <FontAwesome6 name="bookmark" size={24} color="white" className="bg-teal-500 p-1 rounded-full h-10 w-10 text-center" />
                    <Text className="text-sm text-teal-500 font-semibold">123k</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2">
                    <Entypo name="forward" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">123k</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full px-4 gap-y-4 bottom-10">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-semibold">FinTech</Text>
                    <View className="gap-x-2 flex-row">
                        <EvilIcons name="eye" size={24} color="black" />
                        <Text className="text-sm text-gray-500 font-semibold">123k Views</Text>
                    </View>
                </View>
                <Text className="text-gray-500 font-semibold">
                    A wearable health device that monitors body conditions
                    like temperature, hydration, and immunity ... more
                </Text>
                <Text className="text-gray-500 font-semibold">
                    Raised $5,200 of $10,000
                </Text>
            </View>
            <View>

            </View>
        </View>
    )
}