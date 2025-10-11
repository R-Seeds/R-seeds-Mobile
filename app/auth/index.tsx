import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Text, TouchableOpacity ,View,Image} from "react-native";

export default function AuthScreen() {
    return (
        <View className="flex-1 relative items-center justify-center">
            <Image
                className="absolute h-full w-full top-0 left-0 right-0 bottom-0 -z-10"
                resizeMode="cover"
                source={require('@/assets/auth/main.png')}
            />
            <View className="rounded-3xl overflow-hidden border border-white/20 ">
                <BlurView
                    tint="dark"
                    intensity={15}
                    experimentalBlurMethod="dimezisBlurView"
                    className="p-10 py-16 gap-y-6"
                >
                    <View className="flex items-center">
                        <Text className="text-2xl font-bold text-white/80">Welcome to R-Seeds</Text>
                        <Text className="text-lg text-white/80">Explore real projects by real minds</Text>
                    </View>
                    <View className="flex items-center gap-y-4">
                        <TouchableOpacity
                            onPress={() => router.push('/auth/login')}
                            className="bg-teal-600 p-3 rounded-3xl w-full items-center"
                        >
                            <Text className="text-white/80 font-bold text-lg">SIGN IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push('/auth/register')}
                            className="border border-teal-500 p-3 rounded-3xl w-full items-center "
                        >
                            <Text className="text-white/80 font-bold text-lg">SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </View>
    );
}