import { Image, Text, View } from "react-native";


export default function ProjectMember() {
    return (
        <View className="border-2 border-gray-200 rounded-2xl bg-white shadow-lg py-4 px-8 items-center gap-y-4">
            <Image source={require('@/assets/images/profile.jpg')}
                className="w-24 h-24 rounded-full" />
            <Text className="font-bold text-lg">John Doe</Text>
            <Text className="text-gray-500">Software Engineer</Text>
        </View>
    )
}