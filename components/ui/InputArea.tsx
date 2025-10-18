import { Text, TextInput, View } from "react-native";

interface Props {
    label: string;
    value: string;
    setValue: (value: string) => void;
}

export default function InputArea({ label, value, setValue }: Props) {
    return (
        <View className="gap-y-2">
            <Text className="text-lg font-semibold">{label}</Text>
            <TextInput 
            className="border border-gray-300 rounded-md p-2 h-24"
            value={value}
            onChangeText={setValue}
            />
        </View>
    )
}