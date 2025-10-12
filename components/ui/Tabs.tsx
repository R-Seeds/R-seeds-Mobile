import { View, TouchableOpacity, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabNavigation() {
    return (
        <SafeAreaView className="absolute flex-row justify-between items-center bg-white bottom-0  w-full border-t-2 border-gray-200 px-4">
            <TouchableOpacity className="">
                <AntDesign name="home" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="">
                <FontAwesome6 name="compass" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="">
                <Octicons name="database" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="">
                <Ionicons name="chatbubble-ellipses-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="">
                <FontAwesome name="user-circle-o" size={30} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}