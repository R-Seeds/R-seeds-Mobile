import Header from "@/components/ui/Header";
import TabNavigation from "@/components/ui/Tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import MyProject from "@/components/project/myProject";
import { router } from "expo-router";

export default function MyProjectScreen() {
    return (
        <View className="flex-1 bg-white">
            <Header />
            <View className="flex-1 gap-y-4 px-4">
                <View className="gap-y-4">
                    <Text className="font-bold text-lg">My Projects</Text>
                    <TouchableOpacity className="flex-row gap-x-2 bg-teal-500 p-2 rounded-full items-center justify-center"
                        onPress={() => router.push('/project/create')}>
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Project</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerClassName="gap-y-4">
                    <MyProject />
                    <MyProject />
                    <MyProject />
                    <MyProject />
                    <MyProject />
                </ScrollView>
            </View>
            <TabNavigation />
        </View>
    )
}