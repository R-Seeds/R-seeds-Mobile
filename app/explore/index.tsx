import Header from "@/components/ui/Header";
import TabNavigation from "@/components/ui/Tabs";
import { TabProps, Tabs } from "@/types";
import { useState } from "react";
import { ScrollView, View } from "react-native";


export default function ExpoloreIndex() {
    const [currentTab, setCurrentTab] = useState<TabProps>('all')

    return (
        <View className="flex-1 bg-white">
            <Header />
            <View>
                <View></View>
                <ScrollView>

                </ScrollView>

            </View>
            <TabNavigation />
        </View>
    )
}