import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FundingInfo } from "@/types";
import { useState } from "react";

interface Props {
    visible: boolean;
    onClose: () => void;
    fundingInfo: FundingInfo | undefined;
    setFundingInfo: (fundingInfo: FundingInfo) => void;
    addFundingInfo: (fundingInfo: FundingInfo) => void;
    removeFundingInfo: () => void;
}

export default function FundingInfoModal({ visible, onClose, fundingInfo, setFundingInfo, addFundingInfo, removeFundingInfo }: Props) {
    const handleSave = () => {
        const newFundingInfo: FundingInfo = {
            goal: Number(goal) || 0,
            raised: Number(raised) || 0,
            donors: Number(donors) || 0,
        };
        addFundingInfo(newFundingInfo);
        onClose();
    };

    const [goal, setGoal] = useState(fundingInfo?.goal?.toString() || "");
    const [raised, setRaised] = useState(fundingInfo?.raised?.toString() || "");
    const [donors, setDonors] = useState(fundingInfo?.donors?.toString() || "");

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

                            <View className="space-y-4">
                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">Funding Goal</Text>
                                    <TextInput
                                        placeholder="Enter funding goal amount"
                                        className="bg-white rounded-lg px-3 py-3 border border-gray-200"
                                        keyboardType="numeric"
                                        value={goal}
                                        onChangeText={setGoal}
                                    />
                                </View>

                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">Amount Raised</Text>
                                    <TextInput
                                        placeholder="Enter amount raised so far"
                                        className="bg-white rounded-lg px-3 py-3 border border-gray-200"
                                        keyboardType="numeric"
                                        value={raised}
                                        onChangeText={setRaised}
                                    />
                                </View>

                                <View>
                                    <Text className="text-sm font-medium text-gray-700 mb-2">Number of Donors</Text>
                                    <TextInput
                                        placeholder="Enter number of donors"
                                        className="bg-white rounded-lg px-3 py-3 border border-gray-200"
                                        keyboardType="numeric"
                                        value={donors}
                                        onChangeText={setDonors}
                                    />
                                </View>
                            </View>

                            {fundingInfo && (
                                <TouchableOpacity
                                    onPress={removeFundingInfo}
                                    className="mt-4 border border-red-300 rounded-lg py-2"
                                >
                                    <Text className="text-center text-red-600">
                                        Remove Funding Information
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                onPress={handleSave}
                                className="bg-teal-600 rounded-md py-3 mt-6"
                            >
                                <Text className="text-center text-white font-semibold">
                                    Save Funding Information
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
