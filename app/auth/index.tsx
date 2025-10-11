import { Image, View } from "react-native";

export default function AuthScreen() {
    return (
        <View className="flex-1 relative">
                <Image className="absolute h-full w-full top-0 left-0 right-0 bottom-0 -z-10"
                    resizeMode="cover"
                    source={require('@/assets/auth/main.png')}
                />
            
            <View className="flex-1">
                
            </View>
        </View>
    )
}