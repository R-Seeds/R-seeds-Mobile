import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image, View } from "react-native";

export default function Header() {
    return (
        <View className="bg-white items-center justify-between flex-row w-full pr-4 pt-2">
            <Image source={require("@/assets/images/logo.png")}
                className="w-28 h-20"
                resizeMode="contain" />

            <View className='flex-row gap-x-4 items-center'>
                <FontAwesome6 name="bell" size={20} color="black" />
                <Image source={require("@/assets/images/profile.jpg")}
                    className="w-8 h-8 rounded-full "
                    resizeMode="cover" />
            </View>
        </View>
    )
}