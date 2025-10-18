import { View, TextInput, Text } from "react-native";

interface Props {
    label: string;
    value: string;
    setValue: (value: string) => void;
}

export default function Input({ label, value, setValue }: Props) {
    return (
        <View className="gap-y-2">
            <Text className="text-lg font-semibold">{label}</Text>
            <TextInput
                className="border border-gray-300 rounded-md p-2"
                value={value}
                onChangeText={setValue} />
        </View>
    )
}