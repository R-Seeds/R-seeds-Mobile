import SpotlightProject from "@/components/dashboard/spotlightProject";
import Header from "@/components/ui/Header";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CardProject from "@/components/dashboard/cardProject";
import TabNavigation from "@/components/ui/Tabs";
import { useProjects } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import { UserType } from "@/types";

export default function Dashboard() {
    const { userType } = useAuth()
    const data = useProjects();
    const spotlightProjects = data?.spotlightProjects
    const projects = data?.projects
    return (
        <View className="flex-1 bg-white">
            <Header />
            <ScrollView
                contentContainerClassName="max-w-full p-4 pt-0 gap-y-4 pb-40"
                showsVerticalScrollIndicator={false}
            >
                {/* Spotlight project */}
                <View className="flex-col gap-y-4 flex-1">
                    <Text className="text-lg font-semibold">Spotlight Projects</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerClassName="flex-row gap-x-4">
                        {spotlightProjects && spotlightProjects.length > 0 ? (
                            spotlightProjects.map((project) => (
                                <SpotlightProject key={project.id} project={project} />
                            ))
                        ) : (
                            <View className="flex-1 justify-center items-center py-10">
                                <Text className="text-gray-500 text-center">No spotlight projects available</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>

                {userType === UserType.GRADUATE && (
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
                )}
                {/* Projects */}
                <View className="flex-col gap-y-4 flex-1">
                    {projects && projects.length > 0 ? (
                        projects.map((project) => (
                            <CardProject key={project.id} project={project} />
                        ))
                    ) : (
                        <View className="flex-1 justify-center items-center py-10">
                            <Text className="text-gray-500 text-center text-lg">No projects found</Text>
                            <Text className="text-gray-400 text-center text-sm mt-2">Projects will appear here when available</Text>
                        </View>
                    )}
                </View>

            </ScrollView>
            <TabNavigation />
        </View>
    )
}