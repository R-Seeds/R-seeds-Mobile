import FundingProject from "@/components/project/fundingProject";
import StatusFilter from "@/components/project/StatusFilter";
import Header from "@/components/ui/Header";
import TabNavigation from "@/components/ui/Tabs";
import { useProjects } from "@/contexts/ProjectContext";
import { ScrollView, Text, View } from "react-native";

export default function MyContribution() {
    const { contributionProjects, selectedStatus } = useProjects()
    return (
        <View className="flex-1 bg-white">
            <Header />
            <View className="flex-1 gap-y-4 px-3">
                <View className="gap-y-4">
                    <Text className="font-bold text-lg">My Contribution</Text>

                    {/* Status Filter */}
                    <StatusFilter />
                </View>

                <ScrollView contentContainerClassName="pb-40 gap-y-4"
                    showsVerticalScrollIndicator={false}>

                    {contributionProjects && contributionProjects.length > 0 ? (
                        contributionProjects.map((project) => (
                            <FundingProject key={project.id} project={project} />
                        ))
                    ) : (
                        <View className="flex-1 justify-center items-center py-20">
                            <Text className="text-gray-500 text-center text-lg">
                                {selectedStatus
                                    ? `No ${selectedStatus.toLowerCase()} funding projects available`
                                    : 'No funding projects available'
                                }
                            </Text>
                            <Text className="text-gray-400 text-center text-sm mt-2">Check back later for new opportunities</Text>
                        </View>
                    )}
                </ScrollView>

            </View>
            <TabNavigation />
        </View>
    )
}