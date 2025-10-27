import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LoginRequest } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import useGoogle from "@/hooks/useGoogle";
import LoadingModal from "@/components/modals/Loading";

export default function LoginScreen() {
    const { login, googleLogin, loading } = useAuth()
    const { googleSignIn } = useGoogle()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async () => {
        const request: LoginRequest = {
            email,
            password
        }
        await login(request)
    }

    const handleGoogleSignIn = async () => {
        const userData = await googleSignIn();
        if (userData) {
            await googleLogin(userData.data?.idToken!)
        }
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Image
                className="absolute h-full w-full top-0 left-0 right-0 bottom-0 -z-10"
                resizeMode="cover"
                source={require('@/assets/auth/main.png')}
            />
            <View className="rounded-3xl overflow-hidden border border-white/20 w-96">
                <BlurView
                    tint="dark"
                    intensity={20}
                    experimentalBlurMethod="dimezisBlurView"
                    className="p-6 py-16 gap-y-6"
                >
                    <View className="flex items-center">
                        <Text className="text-2xl font-bold text-white/80">Welcome Back!</Text>
                    </View>
                    <View className="gap-y-4 ">
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="p-4 rounded-3xl border border-white text-white placeholder:text-white w-full"
                            returnKeyType="next"
                        />
                        <View className="flex-row items-center  p-4 rounded-3xl border border-white text-white placeholder:text-white w-full"
                        >
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Password"
                                keyboardType="default"
                                autoCapitalize="none"
                                className="flex-1 py-0 text-white placeholder:text-white w-full"
                                returnKeyType="next"
                                secureTextEntry={!showPassword}
                                onSubmitEditing={onSubmit}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex items-center gap-y-4">
                        <TouchableOpacity
                            className="bg-teal-600 p-3 rounded-3xl w-full items-center"
                            onPress={onSubmit}
                        >
                            <Text className="text-white/80 font-bold text-lg">SIGN IN</Text>
                        </TouchableOpacity>
                        <Link href="/auth/register">
                            <Text className="text-white/80 font-bold text-center">Forgot Password</Text>
                        </Link>
                        <TouchableOpacity className="flex-row items-center gap-x-4 justify-center rounded-3xl border border-white py-3 w-full"
                            onPress={() => handleGoogleSignIn()}
                        >
                            <Svg width="20" height="20" viewBox="0 0 20 24" fill="none">
                                <Path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                                <Path d="M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00" />
                                <Path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5719 17.5745 13.3038 18.0014 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50" />
                                <Path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
                            </Svg>
                            <Text className="text-white/80 font-bold text-center">Sign in with Google</Text>
                        </TouchableOpacity>
                        <View className="flex-row gap-x-2 items-center">
                            <Text className="text-white/80 font-bold text-center">Don&apos;t have account?</Text>
                            <Link href="/auth/register">
                                <Text className="text-teal-600 font-bold text-center">Sign up</Text>
                            </Link>
                        </View>
                    </View>
                </BlurView>
            </View>
            {loading && <LoadingModal visible={loading} />}
        </View>
    )
}