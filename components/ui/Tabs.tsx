import { View, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { JSX } from "react";

interface Tab {
    name: string,
    icon: JSX.Element,
    onPress: () => void
}

export default function TabNavigation() {
    const pathname = usePathname();
    const isCurrentScreen = (data: string) => pathname === data

    const tabs: Tab[] = [
        {
            name: '/dashboard/graduate',
            icon: <AntDesign name="home" size={30} color={isCurrentScreen('/dashboard/graduate') ? "teal" : "gray"} />,
            onPress: () => router.push('/dashboard/graduate')
        },
        {
            name: '/explore',
            icon: <FontAwesome6 name="compass" size={30} color={isCurrentScreen('/explore') ? "teal" : "gray"} />,
            onPress: () => router.push('/explore')
        },
        {
            name: '/funding',
            icon: <Octicons name="database" size={30} color={isCurrentScreen('/funding') ? "teal" : "gray"} />,
            onPress: () => router.push('/funding')
        },
        {
            name: '/chat',
            icon: <Ionicons name="chatbubble-ellipses-outline" size={30} color={isCurrentScreen('/chat') ? "teal" : "gray"} />,
            onPress: () => router.push('/chat')
        },
        {
            name: '/profile',
            icon: <FontAwesome name="user-circle-o" size={30} color={isCurrentScreen('/profile') ? "teal" : "gray"} />,
            onPress: () => router.push('/profile')
        },
    ]

    return (
        <SafeAreaView className="absolute bg-white  bottom-0  w-full border-t-2 border-gray-200 px-2 ">
            <View className="flex-row justify-between items-center bg-white w-full  px-2 ">
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        className={` ${isCurrentScreen(tab.name) && 'border-b-2 border-teal-400 '} pb-4 px-2`}
                        onPress={tab.onPress}
                    >
                        {tab.icon}
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )
}