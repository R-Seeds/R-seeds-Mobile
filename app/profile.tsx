import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "@/contexts/ToastContext";
import TabNavigation from "@/components/ui/Tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useProjects } from "@/contexts/ProjectContext";
import ConfirmModal from "@/components/modals/ConfirmModal";
import ComingSoonModal from "@/components/modals/ComingSoonModal";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { UserType } from "@/types";
import { formatDonation } from "@/lib/moneyFormatter";

export default function ProfileScreen() {
    const { userMe, sponsorMe, graduateMe } = useUser()
    const { logout, userType } = useAuth();
    const { myProjects } = useProjects();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [comingSoonFeature, setComingSoonFeature] = useState({ name: '', description: '' });

    const openComingSoon = (name: string, description: string) => {
        setComingSoonFeature({ name, description });
        setShowComingSoon(true);
    };

    const handleSavedProjectsPress = () => {
        if (userType === "GRADUATE") router.push('/project/myProject');
        else openComingSoon("Saved Projects", "Save your favorite projects to easily find them later. This feature is currently being developed.");
    };

    const handleAccountPress = () => {
        openComingSoon("Account Settings", "Manage your personal information, update your profile picture, and change your password.");
    };

    const handlePaymentPress = () => {
        openComingSoon("Payment Methods", "Add and manage your payment methods for seamless donations and transactions.");
    };

    const handleNotificationPress = () => {
        openComingSoon("Notifications", "Customize your notification preferences and stay updated on projects you follow.");
    };

    const handleLanguagePress = () => {
        openComingSoon("Language & Region", "Change your preferred language and regional settings for a personalized experience.");
    };

    const handlePreferencePress = () => {
        openComingSoon("Preferences", "Customize your app experience with theme settings, display options, and more.");
    };

    const handleLogoutPress = () => {
        setShowConfirmModal(true)
    };

    const handleConfirmLogout = () => {
        logout()
        setShowConfirmModal(false)
    };

    if (!userMe) return

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />

            <View className="absolute -top-20 -left-10 w-[200%] h-56 bg-teal-500 rotate-[-12deg]" />


            {/* Profile Content */}
            <View className="mt-32 items-center px-6 z-10">
                {/* Profile Picture */}
                <View className="relative">
                    <Image
                        source={require('@/assets/images/profile.jpg')}
                        className="w-24 h-24 rounded-full border-4 border-white"
                    />
                </View>

                {/* User Info */}
                <View className="mt-4 items-center">
                    <Text className="font-bold text-xl text-gray-800">{userMe?.name}</Text>
                    <Text className="text-teal-500 font-medium text-base">{userType.charAt(0).toUpperCase() + userType.slice(1)}</Text>
                </View>

                {/* Stats Section */}
                <View className="flex-row mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mx-2">
                    {userType !== "USER" && (
                        <>
                            <View className="flex-1 items-center py-4 px-2">
                                <Text className="font-semibold text-lg text-gray-800 text-center" numberOfLines={1}>
                                    {userType === "SPONSOR" ? formatDonation(sponsorMe?.totalFunded) : '0'}
                                </Text>
                                <Text className="text-gray-500 text-xs font-medium text-center">{userType === "SPONSOR" ? "Funded" : "Raised funds"}</Text>
                            </View>
                            <View className="w-px bg-gray-200 my-4" />
                        </>
                    )}

                    <View className="flex-1 items-center py-4 px-2">
                        <Text className="font-bold text-xl text-gray-800">{userType === "GRADUATE" ? graduateMe?.totalProjects : myProjects?.length}</Text>
                        <Text className="text-gray-500 text-xs font-medium">Projects</Text>
                    </View>

                    <View className="w-px bg-gray-200 my-4" />

                    <View className="flex-1 items-center py-4 px-2">
                        <Text className="font-bold text-xl text-gray-800">{userMe?.followingProjects}</Text>
                        <Text className="text-gray-500 text-xs font-medium">Following</Text>
                    </View>
                </View>
            </View>
            {/* Menu Items */}
            <ScrollView
                className=""
                contentContainerClassName="pt-4 pb-40"
                showsVerticalScrollIndicator={false}
                bounces={false}
                scrollEnabled={true}
            >
                <View className="px-6 gap-y-1">
                    {/* Saved Projects */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 px-1"
                        onPress={handleSavedProjectsPress}
                    >
                        <View className="flex-row items-center gap-x-4">
                            <View className="w-10 h-10 bg-teal-100 rounded-full items-center justify-center">
                                <AntDesign name="save" size={20} color="#14b8a6" />
                            </View>
                            <Text className="text-gray-800 text-lg font-medium">
                                {userType === UserType.GRADUATE ? 'My projects' : 'Saved Projects'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                    </TouchableOpacity>

                    {/* Account Info */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 px-1"
                        onPress={handleAccountPress}
                    >
                        <View className="flex-row items-center gap-x-4">
                            <View className="w-10 h-10 bg-teal-100 rounded-full items-center justify-center">
                                <Ionicons name="person-outline" size={20} color="#14b8a6" />
                            </View>
                            <Text className="text-gray-800 text-lg font-medium">Account info</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                    </TouchableOpacity>

                    {/* Payment Methods */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 px-1"
                        onPress={handlePaymentPress}
                    >
                        <View className="flex-row items-center gap-x-4">
                            <View className="w-10 h-10 bg-teal-100 rounded-full items-center justify-center">
                                <MaterialIcons name="payment" size={20} color="#14b8a6" />
                            </View>
                            <Text className="text-gray-800 text-lg font-medium">Payment Methods</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                    </TouchableOpacity>

                    {/* Notifications */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 px-1"
                        onPress={handleNotificationPress}
                    >
                        <View className="flex-row items-center gap-x-4">
                            <View className="w-10 h-10 bg-teal-100 rounded-full items-center justify-center">
                                <Ionicons name="notifications-outline" size={20} color="#14b8a6" />
                            </View>
                            <Text className="text-gray-800 text-lg font-medium">Notifications</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                    </TouchableOpacity>

                    {/* Language and Region */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 px-1"
                        onPress={handleLanguagePress}
                    >
                        <View className="flex-row items-center gap-x-4">
                            <View className="w-10 h-10 bg-teal-100 rounded-full items-center justify-center">
                                <Ionicons name="globe-outline" size={20} color="#14b8a6" />
                            </View>
                            <Text className="text-gray-800 text-lg font-medium">Language and Region</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                    </TouchableOpacity>

                    {/* Preference */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 px-1"
                        onPress={handlePreferencePress}
                    >
                        <View className="flex-row items-center gap-x-4">
                            <View className="w-10 h-10 bg-teal-100 rounded-full items-center justify-center">
                                <Ionicons name="settings-outline" size={20} color="#14b8a6" />
                            </View>
                            <Text className="text-gray-800 text-lg font-medium">Preference</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                    </TouchableOpacity>

                    {/* Logout */}
                    <TouchableOpacity
                        className="flex-row items-center justify-between py-4 px-1 mt-4"
                        onPress={handleLogoutPress}
                    >
                        <View className="flex-row items-center gap-x-4">
                            <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                            </View>
                            <Text className="text-red-500 text-lg font-medium">Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ConfirmModal
                visible={showConfirmModal}
                title="Logout"
                message="Are you sure you want to logout?"
                onConfirm={handleConfirmLogout}
                onCancel={() => setShowConfirmModal(false)}
            />
            <ComingSoonModal
                visible={showComingSoon}
                onClose={() => setShowComingSoon(false)}
                featureName={comingSoonFeature.name}
                description={comingSoonFeature.description}
            />
            <TabNavigation />
        </View>
    )
}