import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from "react-native";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { GoogleAuthRequest, SignupRequest, UserType } from "@/types";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import useGoogle from "@/hooks/useGoogle";
import RoleSelectionModal from "@/components/RoleSelectionModal";

export default function RegisterScreen() {
    const { register, google } = useAuth()
    const { googleSignIn } = useGoogle()
    const [userType, setUserType] = useState<UserType>(UserType.GRADUATE);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [graduationYear, setGraduationYear] = useState<number>(new Date().getFullYear());
    const [industry, setIndustry] = useState('');
    const [country, setCountry] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);

    const handleRegister = () => {
        const request: SignupRequest = {
            name,
            email,
            password,
            role: userType,
            finishYear: graduationYear,
            organization: industry,
            country
        }
        register(request)
    }



    const handleGoogleSignIn = async () => {
        const userData = await googleSignIn();
        return userData
    }

    const handleRoleSelection = async (selectedRole: UserType, additionalData?: {
        finishYear?: number;
        organization?: string;
        country?: string;
    }) => {
        setShowRoleModal(false)
        const userData = await handleGoogleSignIn()
        if (userData) {
            const googleRequest: GoogleAuthRequest = {
                token: userData.data?.idToken!,
                role: selectedRole,
                finishYear: additionalData?.finishYear,
                organization: additionalData?.organization,
                country: additionalData?.country
            }
            await google(googleRequest)
        }
    }

    const handleCancelRoleSelection = () => {
        setShowRoleModal(false);
    }

    const extraInput = () => {
        if (userType === UserType.GRADUATE) {
            return (
                <TextInput
                    placeholder="Graduation Year"
                    value={graduationYear.toString()}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    className="p-4 rounded-3xl border border-white text-white placeholder:text-white w-full"
                    returnKeyType="next"
                    onChangeText={(text) => setGraduationYear(parseInt(text))}
                />
            )
        }
        if (userType === UserType.SPONSOR) {
            return (
                <TextInput
                    placeholder="Industry / Organization"
                    keyboardType="default"
                    autoCapitalize="none"
                    className="p-4 rounded-3xl border border-white text-white placeholder:text-white w-full"
                    returnKeyType="next"
                    value={industry}
                    onChangeText={setIndustry}
                />
            )
        } else {
            return (
                <TextInput
                    placeholder="Country"
                    keyboardType="default"
                    autoCapitalize="none"
                    className="p-4 rounded-3xl border border-white text-white placeholder:text-white w-full"
                    returnKeyType="next"
                    value={country}
                    onChangeText={setCountry}
                />)
        }
    }

    return (
        <>
            <Image
                className="absolute h-full w-full top-0 left-0 right-0 bottom-0 -z-10"
                resizeMode="cover"
                source={require('@/assets/auth/main.png')}
            />
            <KeyboardAvoidingView behavior="padding" className="flex-1 relative bg-">

                <View className="flex-1 items-center justify-center z-10">

                    <View className="rounded-3xl overflow-hidden border border-white/20 w-96">

                        <ScrollView>
                            <BlurView
                                tint="dark"
                                intensity={20}
                                experimentalBlurMethod="dimezisBlurView"
                                className="p-6 py-16 gap-y-6"
                            >
                                <View className="flex items-center">
                                    <Text className="text-2xl font-bold text-white/80">Join R-Seeds</Text>
                                    <Text className="text-white/80 font-bold text-center">Empower Innovation from RCA Graduates</Text>
                                </View>
                                <View className="flex-col items-center gap-y-4">
                                    <View className="flex-row items-center justify-between gap-x-2 border border-white rounded-3xl p-1  w-full">
                                        <TouchableOpacity className={`${userType === UserType.GRADUATE && "  bg-teal-600"} py-2 px-3 rounded-3xl items-center`}
                                            onPress={() => setUserType(UserType.GRADUATE)}>
                                            <Text className="text-white">🎓 Graduate</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className={`${userType === UserType.SPONSOR && "  bg-teal-600"} py-2 px-3 rounded-3xl items-center`}
                                            onPress={() => setUserType(UserType.SPONSOR)}>
                                            <Text className="text-white">💰 Sponsor</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className={`${userType === UserType.USER && "  bg-teal-600"} py-2 px-3 rounded-3xl items-center`}
                                            onPress={() => setUserType(UserType.USER)}>
                                            <Text className="text-white">👥 User</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        placeholder="Full Name"
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        className="p-4 rounded-3xl border border-white text-white placeholder:text-white w-full"
                                        returnKeyType="next"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                    <TextInput
                                        placeholder="Email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        className="p-4 rounded-3xl border border-white text-white placeholder:text-white w-full"
                                        returnKeyType="next"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                    {extraInput()}
                                    <View className="flex-row items-center  p-4 rounded-3xl border border-white text-white placeholder:text-white w-full"
                                    >
                                        <TextInput
                                            placeholder="Password"
                                            keyboardType="default"
                                            autoCapitalize="none"
                                            className="flex-1 py-0 text-white placeholder:text-white w-full"
                                            returnKeyType="done"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!isPasswordVisible}
                                        />
                                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                            <Ionicons name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity className="p-4 rounded-3xl bg-teal-600 w-full"
                                    onPress={handleRegister}
                                >
                                    <Text className="text-white font-bold text-center">
                                        Signup as {userType.toLowerCase().charAt(0).toUpperCase() + userType.toLowerCase().slice(1)}
                                    </Text>
                                </TouchableOpacity>
                                <View className="flex-row items-center justify-center gap-x-2">
                                    <Text className="text-white/80">Already have an account?</Text>
                                    <TouchableOpacity>
                                        <Text className="text-teal-600 font-bold">Sign in</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity className="flex-row items-center gap-x-4 justify-center rounded-3xl border border-white py-3 w-full"
                                    onPress={() => setShowRoleModal(true)}>
                                    <Svg width="20" height="20" viewBox="0 0 20 24" fill="none">
                                        <Path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                                        <Path d="M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00" />
                                        <Path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5719 17.5745 13.3038 18.0014 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50" />
                                        <Path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
                                    </Svg>
                                    <Text className="text-white/80 font-bold text-center">Sign up with Google</Text>
                                </TouchableOpacity>
                            </BlurView>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <RoleSelectionModal
                visible={showRoleModal}
                onSelectRole={handleRoleSelection}
                onCancel={handleCancelRoleSelection}
            />
        </>
    )
}