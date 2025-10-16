import { Image, Text, View } from "react-native";

export default function SpotlightProject() {
    return (
        <View className="gap-y-1 items-center ">
            <Image source={require("@/assets/auth/main.png")}
                resizeMode="cover"
                className="w-28 h-36 rounded-xl border-2 border-teal-500" />
                <Text className=" text-gray-500 font-semibold">FinTech</Text>
        </View>
    )
}