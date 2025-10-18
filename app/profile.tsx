import { FontAwesome, Ionicons, FontAwesome6, MaterialIcons, Fontisto, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "@/contexts/ToastContext";

export default function ProfileScreen() {
    const { showSuccess, showError, showInfo, showWarning } = useToast();

    const handleAccountPress = () => {
        showInfo("Account", "Account settings will be available soon!");
    };

    const handlePaymentPress = () => {
        showWarning("Payment Info", "Please verify your payment details.");
    };

    const handleNotificationPress = () => {
        showSuccess("Notifications", "Notification preferences updated!");
    };

    const handleLogoutPress = () => {
        showError("Logout", "Are you sure you want to logout?");
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />
            <View className="absolute -top-20 -left-10 w-[200%] h-56 bg-teal-500 rotate-[-12deg]" />

            <View className="mt-32 items-center">
                <Image
                    source={require('@/assets/images/profile.jpg')}
                    className="w-32 h-32 rounded-full border-4 border-white"
                />
            </View>
            <View className="mt-4 w-full items-center">
                <Text className="font-bold text-xl">Hacker</Text>
                <Text className="text-teal-500">Rca Graduate</Text>
            </View>
            <ScrollView contentContainerClassName="gap-y-10 px-4 pb-20">
                <View className="border-2 border-gray-300 flex-row items-center rounded-xl justify-between">
                    <View className="flex-col items-center  p-4 border-r border-gray-300">
                        <Text className="font-bold text-lg">$5000</Text>
                        <Text className="text-teal-500 font-semibold">Fund Raised</Text>
                    </View>
                    <View className="flex-col items-center  p-4 pr-0 border-r border-gray-300">
                        <Text className="font-bold text-lg">8</Text>
                        <Text className="text-teal-500 font-semibold">Projects</Text>
                    </View>
                    <View className="flex-col items-center  p-4  border-gray-600 ">
                        <Text className="font-bold text-lg">10</Text>
                        <Text className="text-teal-500 font-semibold">Following</Text>
                    </View>
                </View>
                <View className="px-4 gap-y-6">
                    <TouchableOpacity className="flex-row gap-x-2  items-center justify-between"
                        onPress={() => router.push('/project/myProject')}>
                        <View className="flex-row gap-x-2  items-center">
                            <AntDesign name="fund-projection-screen" size={30} color="teal" />
                            <Text className=" text-lg">My Projects</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row gap-x-2  items-center justify-between"
                        onPress={handleAccountPress}>
                        <View className="flex-row gap-x-2  items-center">
                            <FontAwesome6 name="user-large" size={30} color="teal" />
                            <Text className="text-lg">Account</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row gap-x-2  items-center justify-between"
                        onPress={handlePaymentPress}>
                        <View className="flex-row gap-x-2  items-center">
                            <MaterialIcons name="payment" size={30} color="teal" />
                            <Text className="text-lg">Payments info</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row gap-x-2  items-center justify-between"
                        onPress={handleNotificationPress}>
                        <View className="flex-row gap-x-2  items-center">
                            <FontAwesome name="bell" size={30} color="teal" />
                            <Text className="text-lg">Notifications</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row gap-x-2  items-center justify-between"
                        onPress={() => router.push('/project/myProject')}>
                        <View className="flex-row gap-x-2  items-center">
                            <Fontisto name="world-o" size={30} color="teal" />
                            <Text className="text-lg">Language and Region</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row gap-x-2  items-center justify-between"
                        onPress={() => router.push('/project/myProject')}>
                        <View className="flex-row gap-x-2  items-center">
                            <FontAwesome name="gear" size={30} color="teal" />
                            <Text className="text-lg">Preference</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row gap-x-2  items-center justify-between"
                        onPress={handleLogoutPress}>
                        <View className="flex-row gap-x-2  items-center">
                            <AntDesign name="logout" size={30} color="red" />
                            <Text className="font-semibold ">Logout</Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}