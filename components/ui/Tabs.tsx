import { View, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { usePathname } from "expo-router";

export default function TabNavigation() {
    const pathname = usePathname();
    const isCurrentScreen = (data:string) => {
        if (pathname === data) return true
        return false
    }
    console.log(pathname)

    return (
        <SafeAreaView className="absolute bg-white  bottom-0  w-full border-t-2 border-gray-200 px-2 ">
            <View className="flex-row justify-between items-center bg-white w-full  px-2 ">
                <TouchableOpacity className={` ${isCurrentScreen('/dashboard/graduate') && 'border-b-2 border-teal-400 '} pb-4 px-2`}>
                    <AntDesign name="home" size={30} color={isCurrentScreen('/dashboard/graduate') ? "teal" : "gray"} />
                </TouchableOpacity>
                <TouchableOpacity className={` ${isCurrentScreen('/explore') && 'border-b-2 border-teal-400 '} pb-4 px-2`}>
                    <FontAwesome6 name="compass" size={30} color={isCurrentScreen('/explore') ? "teal" : "gray"} />
                </TouchableOpacity>
                <TouchableOpacity className={` ${isCurrentScreen('/funding') && 'border-b-2 border-teal-400 '} pb-4   px-2`}>
                    <Octicons name="database" size={30} color={isCurrentScreen('/funding') ? "teal" : "gray"} />
                </TouchableOpacity>
                <TouchableOpacity className={` ${isCurrentScreen('/chat') && 'border-b-2 border-teal-400 '} pb-4   px-2`}>
                    <Ionicons name="chatbubble-ellipses-outline" size={30} color={isCurrentScreen('/chat') ? "teal" : "gray"} />
                </TouchableOpacity>
                <TouchableOpacity className={` ${isCurrentScreen('/profile') && 'border-b-2 border-teal-400 '} pb-4   px-2`}>
                    <FontAwesome name="user-circle-o" size={30} color={isCurrentScreen('/profile') ? "teal" : "gray"} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}