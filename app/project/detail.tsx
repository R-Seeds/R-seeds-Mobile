import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import ProjectMember from "@/components/project/projectMember";
import Svg, { Path } from "react-native-svg";

export default function ProjectScreen() {
    const keyFeature = [
        'Autonomous flight planning via mobile app.',
        'HD video and thermal imaging cameras.',
        'Modular payload system (cameras, sprayers, delivery boxes).',
        'Real-time GPS tracking and geofencing.',
        'Emergency return-to-home functionality.'
    ]
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
            <ScrollView className="py-10 px-4 bg-white absolute top-[30%] rounded-t-[50] h-[70%] w-full "
                contentContainerClassName="w-full  gap-y-4 pb-40"
                showsVerticalScrollIndicator={false}>
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
                <View className="flex-row gap-x-2 items-start">
                    <View className=" flex-row gap-x-1 items-center">
                        <Text className="font-bold text-teal-500 items-center">
                            Mission
                        </Text>
                        <Ionicons name="arrow-forward" size={15} color="black" />
                    </View>
                    <Text className=" test-sm flex-1">
                        To provide reliable, versatile, and cost-effective drone
                        solutions that empower communities, businesses, and
                        organizations.
                    </Text>
                </View>
                <View className="flex-row gap-x-2 items-start">
                    <View className=" flex-row gap-x-1 items-center">
                        <Text className="font-bold text-teal-500 items-center">
                            Vision
                        </Text>
                        <Ionicons name="arrow-forward" size={15} color="black" />
                    </View>
                    <Text className=" test-sm flex-1">
                        To provide reliable, versatile, and cost-effective drone
                        solutions that empower communities, businesses, and
                        organizations.
                    </Text>
                </View>
                <View className="items-center gap-y-2">
                    <Text className="font-bold text-xl text-teal-500">Key Features</Text>
                    {keyFeature.map((feature, index) => (
                        <View className="flex-row gap-x-2 items-center" key={index}>
                            <Octicons name="dot-fill" size={15} color="black" />
                            <Text className="test-sm flex-1">
                                {feature}
                            </Text>
                        </View>
                    ))}
                </View>
                <View className="items-center gap-y-2">
                    <Text className="font-bold text-xl text-teal-500 w-full">Team</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerClassName="gap-x-4">
                        <ProjectMember />
                        <ProjectMember />
                        <ProjectMember />
                    </ScrollView>
                </View>
                <View className="items-center gap-y-2 relative">
                    <Text className="font-bold text-xl text-teal-500 w-full">MileStone</Text>
                    <View className="relative w-full">
                        <View className="absolute top-1/2 -translate-y-1/2 w-full border-4 rounded-full border-teal-500" />
                        <View className="items-center gap-x-2 flex-row justify-between">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <View
                                    key={i}
                                    className={`w-6 h-6 rounded-full border-4 ${i <= 2 ? "border-emerald-500 bg-white" : "border-gray-300 bg-white"
                                        } flex items-center justify-center z-10`}
                                >
                                    {i === 2 && (
                                        <Image className="absolute top-8 w-12 h-12"
                                            resizeMode="contain"
                                            source={require('@/assets/components/milestone.png')} />
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity className="absolute bottom-20  bg-teal-500/80 py-4 px-8 rounded-full">
                <Text className="text-white font-semibold text-lg">Contribute Now</Text>
            </TouchableOpacity>
        </View>
    )
}