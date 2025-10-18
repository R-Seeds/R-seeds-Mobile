import ExploreProject from "@/components/project/exploreProject";
import CategoryFilter from "@/components/project/CategoryFilter";
import StatusFilter from "@/components/project/StatusFilter";
import Header from "@/components/ui/Header";
import TabNavigation from "@/components/ui/Tabs";
import { Ionicons, Feather } from "@expo/vector-icons";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useProjects } from "@/contexts/ProjectContext";
import { ProjectCategoryOptions } from "@/types";


export default function ExpoloreIndex() {
    const { trendingProjects, filteredProjects, selectedCategory, selectedStatus } = useProjects()

    return (
        <View className="flex-1 bg-white">
            <Header />
            <View className="flex-1 gap-y-4 px-2">
                <View className="gap-y-4">
                    <Text className="font-semibold text-lg">Explore</Text>
                    <View className="flex-row w-full gap-x-4">
                        <View className="flex-1 border border-teal-500 rounded-lg flex-row items-center py-2 px-2">
                            <Ionicons name="search" size={15} color="teal" />
                            <TextInput
                                className="py-0 flex-1 "
                                placeholder="Search"
                                placeholderTextColor="gray"
                            />
                        </View>
                        <TouchableOpacity className="border border-teal-500 rounded-lg py-2 px-2 flex-row items-center">
                            <Feather name="filter" size={20} color="teal" />
                            <Text className="text-sm">Sort:Trending</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Category Filter */}
                    <CategoryFilter />
                
                </View>
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-36 gap-y-10">
                    {/* Most Viewed */}
                    <View className="gap-y-4">
                        <Text className="font-semibold ">Most Viewed</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                            contentContainerClassName="gap-x-4 h-60">
                            {trendingProjects && trendingProjects.length > 0 ? (
                                trendingProjects.map((project) => (
                                    <ExploreProject key={project.id} project={project} large={false} />
                                ))
                            ) : (
                                <View className="flex-1 justify-center items-center w-full">
                                    <Text className="text-gray-500 text-center">No trending projects found</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                    <View className="gap-y-4">
                        <Text className="font-semibold ">
                            {(() => {
                                const categoryLabel = selectedCategory 
                                    ? ProjectCategoryOptions.find(opt => opt.value === selectedCategory)?.label 
                                    : null;
                                const statusLabel = selectedStatus ? selectedStatus : null;
                                
                                if (categoryLabel && statusLabel) {
                                    return `${statusLabel} ${categoryLabel} Projects`;
                                } else if (categoryLabel) {
                                    return `${categoryLabel} Projects`;
                                } else if (statusLabel) {
                                    return `${statusLabel} Projects`;
                                } else {
                                    return 'All Projects';
                                }
                            })()}
                        </Text>
                        {/* Display filtered projects in pairs (2-2) */}
                        {filteredProjects && filteredProjects.length > 0 ? (
                            Array.from({ length: Math.ceil(filteredProjects.length / 2) }, (_, rowIndex) => {
                                const startIndex = rowIndex * 2;
                                const rowProjects = filteredProjects?.slice(startIndex, startIndex + 2) || [];
                                return rowProjects.length > 0 ? (
                                    <View key={rowIndex} className="flex-row h-60 justify-between">
                                        {rowProjects.map((project) => (
                                            <ExploreProject key={project.id} large project={project} />
                                        ))}
                                    </View>
                                ) : null;
                            })
                        ) : (
                            <View className="h-60 justify-center items-center">
                                <Text className="text-gray-500 text-center">
                                    {(() => {
                                        const categoryLabel = selectedCategory 
                                            ? ProjectCategoryOptions.find(opt => opt.value === selectedCategory)?.label 
                                            : null;
                                        const statusLabel = selectedStatus ? selectedStatus.toLowerCase() : null;
                                        
                                        if (categoryLabel && statusLabel) {
                                            return `No ${statusLabel} ${categoryLabel.toLowerCase()} projects found`;
                                        } else if (categoryLabel) {
                                            return `No ${categoryLabel.toLowerCase()} projects found`;
                                        } else if (statusLabel) {
                                            return `No ${statusLabel} projects found`;
                                        } else {
                                            return 'No projects found';
                                        }
                                    })()}
                                </Text>
                            </View>
                        )}
                    </View>

                </ScrollView>

            </View>
            <TabNavigation />
        </View>
    )
}