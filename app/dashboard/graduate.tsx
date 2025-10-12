import SpotlightProject from "@/components/dashboard/spotlightProject";
import Header from "@/components/ui/Header";
import { ScrollView, Text, View } from "react-native";

export default function GraduateDashboard() {
    return (
        <View className="flex-1 bg-white">
            <Header />
            <ScrollView contentContainerClassName="flex-1 px-4"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-col gap-y-4 ">
                    <View className="flex-col ">
                        <Text className="text-lg font-semibold">Spotlight Projects</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerClassName="flex-row gap-x-4">
                        <SpotlightProject />
                        <SpotlightProject />
                        <SpotlightProject />
                        <SpotlightProject />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}