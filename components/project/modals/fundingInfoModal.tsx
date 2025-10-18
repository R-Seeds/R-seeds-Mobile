import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    visible: boolean;
    onClose: () => void;
    fundingInfo: { title: string; description: string; status: string; budget: string; date: string }[];
    setFundingInfo: (fundingInfo: { title: string; description: string; status: string; budget: string; date: string }[]) => void;
    addFundingInfo: () => void;
    removeFundingInfo: (index: number) => void;
}

export default function FundingInfoModal({ visible, onClose, fundingInfo, setFundingInfo, addFundingInfo, removeFundingInfo }: Props) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/40 justify-center items-center p-4">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-full rounded-3xl p-5 shadow-lg">
                            <Text className="text-center text-lg font-semibold text-teal-600 mb-4">
                                Funding Information
                            </Text>

                            {fundingInfo.map((funding, index) => (
                                <View
                                    key={index}
                                    className="bg-gray-100 rounded-xl p-3 mb-4 space-y-2"
                                >
                                    <TextInput
                                        placeholder="Milestone Title"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={funding.title}
                                        onChangeText={(t) => {
                                            const updated = [...fundingInfo];
                                            updated[index].title = t;
                                            setFundingInfo(updated);
                                        }}
                                    />

                                    <TextInput
                                        placeholder="Short Description"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={funding.description}
                                        onChangeText={(t) => {
                                            const updated = [...fundingInfo];
                                            updated[index].description = t;
                                            setFundingInfo(updated);
                                        }}
                                    />

                                    <TouchableOpacity className="bg-white rounded-lg px-3 py-2 border border-gray-200 flex-row justify-between items-center">
                                        <Text className="text-gray-500">
                                            {funding.status || "Status"}
                                        </Text>
                                        <Ionicons name="chevron-down" size={18} color="#555" />
                                    </TouchableOpacity>

                                    <TextInput
                                        placeholder="Budget"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        keyboardType="numeric"
                                        value={funding.budget}
                                        onChangeText={(t) => {
                                            const updated = [...fundingInfo];
                                            updated[index].budget = t;
                                            setFundingInfo(updated);
                                        }}
                                    />

                                    <TextInput
                                        placeholder="Expected Completion Date"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={funding.date}
                                        onChangeText={(t) => {
                                            const updated = [...fundingInfo];
                                            updated[index].date = t;
                                            setFundingInfo(updated);
                                        }}
                                    />

                                    {fundingInfo.length > 1 && (
                                        <TouchableOpacity
                                            onPress={() => removeFundingInfo(index)}
                                            className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                                        >
                                            <Ionicons name="trash" size={16} color="white" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={addFundingInfo}
                                className="border border-dashed border-gray-400 rounded-full py-2 mb-4"
                            >
                                <Text className="text-center text-gray-600">
                                    Add Another Funding Information
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={onClose}
                                className="bg-teal-600 rounded-md py-3"
                            >
                                <Text className="text-center text-white font-semibold">
                                    Save Project Funding Information
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
