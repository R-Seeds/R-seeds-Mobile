import FundingProject from "@/components/project/fundingProject";
import StatusFilter from "@/components/project/StatusFilter";
import Header from "@/components/ui/Header";
import TabNavigation from "@/components/ui/Tabs";
import { useProjects } from "@/contexts/ProjectContext";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

export default function MyContribution() {
    const { filteredDonorProjects:donorProjects, selectedStatus, clearFilter ,clearStatusFilter} = useProjects()

    useEffect(() => {
        clearStatusFilter()
        clearFilter()
    }, [])
    return (
        <View className="flex-1 bg-white">
            <Header />
            <View className="flex-1 gap-y-4 px-3">
                <View className="gap-y-4">
                    <Text className="font-bold text-lg">My Contribution</Text>
                    <StatusFilter />
                </View>

                <ScrollView contentContainerClassName="pb-40 gap-y-4"
                    showsVerticalScrollIndicator={false}>

                    {donorProjects && donorProjects.length > 0 ? (
                        donorProjects.map((project) => (
                            <FundingProject key={project.id} project={project} />
                        ))
                    ) : (
                        <View className="flex-1 justify-center items-center py-20">
                            <Text className="text-gray-500 text-center text-lg">
                                {selectedStatus
                                    ? `No ${selectedStatus.toLowerCase()} contribution projects available`
                                    : 'No contribution projects available'
                                }
                            </Text>
                            <Text className="text-gray-400 text-center text-sm mt-2">Donate to Project to show it here.</Text>
                        </View>
                    )}
                </ScrollView>

            </View>
            <TabNavigation />
        </View>
    )
}