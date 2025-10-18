import Header from "@/components/ui/Header";
import TabNavigation from "@/components/ui/Tabs";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import FundingProject from "@/components/project/fundingProject";
import { useProjects } from "@/contexts/ProjectContext";



export default function MyProjectsScreen() {
    const{projects}=useProjects()
    const [currentTab, setCurrentTab] = useState<'all' | 'active' | 'archieved'>('all')
    const tabs = ['all', 'active', 'archieved']
    return (
        <View className="flex-1 bg-white">
            <Header />
            <View className="flex-1 gap-y-4 px-3">
                <View className="gap-y-4">
                    <Text className="font-bold text-lg">Funding</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerClassName="gap-x-4">
                        {tabs.map((tab, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentTab(tab as 'all' | 'active' | 'archieved')}
                                className={`px-4 py-1 border border-teal-500 rounded-2xl ${currentTab === tab ? "bg-teal-500" : ""}`}
                            >
                                <Text className={currentTab === tab ? "font-semibold text-white" : "text-black"}>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <ScrollView contentContainerClassName="pb-40 gap-y-4"
                    showsVerticalScrollIndicator={false}>
                    {projects?.map((project) => (
                        <FundingProject key={project.id} project={project} />
                    ))}
                </ScrollView>

            </View>
            <TabNavigation />
        </View>
    )
}