import { Text, TextInput, View } from "react-native";

export default function InputArea() {
    return (
        <View className="gap-y-2">
            <Text className="text-lg font-semibold">Input Area</Text>
            <TextInput 
            className="border border-gray-300 rounded-md p-2 h-24"
            />
        </View>
    )
}