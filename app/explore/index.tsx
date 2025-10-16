import ExploreProject from "@/components/project/exploreProject";
import Header from "@/components/ui/Header";
import TabNavigation from "@/components/ui/Tabs";
import { TabProps, Tabs } from "@/types";
import { Ionicons, Feather } from "@expo/vector-icons";

import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function ExpoloreIndex() {
    const [currentTab, setCurrentTab] = useState<TabProps>('all')

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
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerClassName="gap-x-2">
                        {Tabs.map((tab, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentTab(tab)}
                                className={`px-4 py-1 border border-teal-500 rounded-2xl ${currentTab === tab ? "bg-teal-500" : ""}`}
                            >
                                <Text className={currentTab === tab ? "font-semibold text-white" : "text-black"}>
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerClassName="pb-36 gap-y-10">
                    {/* Most Viewed */}
                    <View className="gap-y-4">
                        <Text className="font-semibold ">Most Viewed</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                            contentContainerClassName="gap-x-4 h-60">
                            <ExploreProject large={false} />
                            <ExploreProject large={false} />
                            <ExploreProject large={false} />
                            <ExploreProject large={false} />
                            <ExploreProject large={false} />
                            <ExploreProject large={false} />
                        </ScrollView>
                    </View>
                    <View className="gap-y-4">
                        <Text className="font-semibold ">Based on your interests</Text>
                        <View className="flex-row h-60 justify-between">
                            <ExploreProject large />
                            <ExploreProject large />
                        </View>
                        <View className="flex-row h-60 justify-between">
                            <ExploreProject large />
                            <ExploreProject large />
                        </View>
                    </View>

                </ScrollView>

            </View>
            <TabNavigation />
        </View>
    )
}