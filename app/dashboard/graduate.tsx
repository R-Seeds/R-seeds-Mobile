import Header from "@/components/ui/Header";
import { ScrollView, View } from "react-native";

export default function GraduateDashboard() {
    return (
        <View className="flex-1 bg-white">
            <Header />
            <ScrollView className="flex-1"
                showsVerticalScrollIndicator={false}
            >

            </ScrollView>
        </View>
    )
}