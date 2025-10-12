import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image, View } from "react-native";

export default function Header() {
    return (
        <View className="bg-white items-center justify-between flex-row w-full pr-4">
            <Image source={require("@/assets/images/logo.png")}
                className="w-28 h-28"
                resizeMode="contain" />

            <View className='flex-row gap-x-4 items-center'>
                <FontAwesome6 name="bell" size={20} color="black" />
                <FontAwesome6 name="user" size={16} color="white" className="bg-gray-800 rounded-full p-2" />
            </View>
        </View>
    )
}