import SpotlightProject from "@/components/dashboard/spotlightProject";
import Header from "@/components/ui/Header";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CardProject from "@/components/dashboard/cardProject";
import TabNavigation from "@/components/ui/Tabs";
import { useProjects } from "@/contexts/ProjectContext";

export default function GraduateDashboard() {
    const data = useProjects();
    const spotlightProjects = data?.spotlightProjects
    const projects=data?.projects
    return (
        <View className="flex-1 bg-white">
            <Header />
            <ScrollView
                contentContainerClassName="max-w-full p-4 pt-0 gap-y-4 pb-32"
                showsVerticalScrollIndicator={false}
            >
                {/* Spotlight project */}
                <View className="flex-col gap-y-4 flex-1">
                    <Text className="text-lg font-semibold">Spotlight Projects</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerClassName="flex-row gap-x-4">
                        {spotlightProjects?.map((project) => (
                            <SpotlightProject key={project.id} project={project} />
                        ))}
                    </ScrollView>
                </View>

                {/* Wallet */}
                <View className="flex-row flex-1 gap-x-4 border-2 shadow-lg bg-white border-gray-200 rounded-2xl py-6 px-4 items-center justify-between">
                    <MaterialIcons name="account-balance-wallet" size={35} color="#00C896" className="bg-gray-200 p-3 rounded-full" />
                    <View className="flex-col gap-y-1 items-start">
                        <Text className="text-2xl font-bold">$2,500</Text>
                        <Text className="text-xs text-gray-500 font-semibold">Wallet Balance</Text>
                    </View>
                    <View className="flex-col gap-y-2">
                        <TouchableOpacity className="bg-teal-400 px-4 py-2 rounded-3xl items-center ">
                            <Text className="text-sm text-white font-semibold">Request Withdraw</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-teal-400 px-4 py-2 rounded-3xl items-center">
                            <Text className="text-sm text-white font-semibold">Add Project</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Projects */}
                <View className="flex-col gap-y-4 flex-1">
                    {projects?.map((project) => (
                        <CardProject key={project.id} project={project} />
                    ))}
                </View>

            </ScrollView>
            <TabNavigation />
        </View>
    )
}