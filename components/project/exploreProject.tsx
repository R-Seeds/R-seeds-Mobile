import { View, Text, Image } from "react-native";

export default function ExploreProject({large}:{large:boolean}) {
    return (
        <View className={`relative ${large ? "w-48" : "w-40"} h-full items-center  border-2 border-teal-500 rounded-xl`}>
            <Image source={require("@/assets/auth/main.png")}
                resizeMode="cover"
                className="absolute w-full h-full rounded-xl " />
            <Text className="absolute bottom-0 bg-black/50 p-2 w-full text-center text-white font-semibold  rounded-b-xl ">FinTech</Text>
        </View>
    )
}