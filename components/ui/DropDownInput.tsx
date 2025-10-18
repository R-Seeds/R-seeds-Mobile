// components/global/Input.tsx
import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type DropdownOption<T> = { label: string; value: T };

interface InputProps<T> {
    label: string;
    placeholder: string;
    value: T;
    options: DropdownOption<T>[];
    onChange: (data: T) => void;
}

export default function DropdownInput<T>({
    label,
    placeholder,
    value,
    options,
    onChange,
}: InputProps<T>) {
    const [open, setOpen] = useState(false);

    return (
        <View className="w-full relative py-2 items-center">
            <Text className="font-semibold text-black text-lg mb-1 min-w-full">{label}</Text>


            <TouchableOpacity
                className="border border-gray-400 rounded-lg  py-2 px-6 w-full flex-row justify-between items-center"
                onPress={() => setOpen(true)}
            >
                <Text
                    className={` ${!value ? "text-gray-600" : "text-black"
                        }`}
                >
                    {value
                        ? options.find((o) => o.value === value)?.label
                        : placeholder}
                </Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="gray" />
            </TouchableOpacity>

            {/* Modal with Scrollable List */}
            <Modal visible={open} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                    <View className="flex-1 bg-black/10 justify-center items-center">
                        <TouchableWithoutFeedback>
                            <View className="bg-white rounded-xl w-4/5 max-w-md max-h-[90%]">
                                <FlatList
                                    data={options}
                                    keyExtractor={(item) => String(item.value)}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className="py-4 px-6 border-b border-gray-200"
                                            onPress={() => {
                                                onChange(item.value);
                                                setOpen(false);
                                            }}
                                        >
                                            <Text className="text-lg">{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}