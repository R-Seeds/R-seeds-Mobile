import { View, TextInput, Text } from "react-native";

export default function Input() {
    return (
        <View className="gap-y-2">
            <Text className="text-lg font-semibold">Input</Text>
            <TextInput
                className="border border-gray-300 rounded-md p-2" />
        </View>
    )
}