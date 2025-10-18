import { Ionicons } from "@expo/vector-icons";
import { View, Modal, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Graduate } from "@/types";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    members: Graduate[];
    setMembers: (members: Graduate[]) => void;
    addMember: (member: Graduate) => void;
    removeMember: (index: number) => void;
}

export default function TeamMemberModal({ visible, setVisible, members, setMembers, addMember, removeMember }: Props) {
    const data = useUser();
    const graduates = data?.graduates || [];
    const [searchQuery, setSearchQuery] = useState("");


    const filteredGraduates = graduates.filter(graduate =>
        graduate.user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !members.find(member => member.id === graduate.id)
    );

    const handleSelectGraduate = (graduate: Graduate) => {
        addMember(graduate);
        setSearchQuery("");
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
            onRequestClose={() => setVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View className="flex-1 bg-black/40 justify-center items-center p-4">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-full rounded-3xl p-5 shadow-lg max-h-[80%]">
                            <Text className="text-center text-lg font-semibold text-teal-600 mb-4">
                                Team Members
                            </Text>

                            {/* Search Input */}
                            <View className="mb-4">
                                <TextInput
                                    placeholder="Search graduates..."
                                    className="border border-gray-300 rounded-lg px-3 py-3 text-gray-800"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {/* Available Graduates */}
                                <View className="mb-4">
                                    <Text className="text-sm font-medium text-gray-700 mb-2">
                                        Available Graduates ({filteredGraduates.length}):
                                    </Text>
                                    {filteredGraduates.length > 0 ? (
                                        filteredGraduates.map((graduate) => (
                                            <TouchableOpacity
                                                key={graduate.id}
                                                onPress={() => handleSelectGraduate(graduate)}
                                                className="border border-gray-200 rounded-lg px-3 py-3 mb-2 bg-gray-50"
                                            >
                                                <Text className="text-gray-800 font-medium">{graduate.user.name}</Text>
                                                <Text className="text-gray-500 text-sm">Finished: {graduate.finishYear}</Text>
                                            </TouchableOpacity>
                                        ))
                                    ) : graduates.length === 0 ? (
                                        <Text className="text-gray-500 text-center py-2">Loading graduates...</Text>
                                    ) : (
                                        <Text className="text-gray-500 text-center py-2">No graduates found</Text>
                                    )}
                                </View>

                                {/* Selected Members */}
                                <View className="mb-4">
                                    <Text className="text-sm font-medium text-gray-700 mb-2">Selected Members:</Text>
                                    {members.length > 0 ? (
                                        members.map((member, index) => (
                                            <View key={index} className="flex-row items-center mb-2 bg-teal-50 rounded-lg px-3 py-2">
                                                <View className="flex-1">
                                                    <Text className="text-gray-800 font-medium">{member.user.name}</Text>
                                                    <Text className="text-gray-500 text-sm">Finished: {member.finishYear}</Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => removeMember(index)}
                                                    className="bg-red-500 rounded-lg p-2"
                                                >
                                                    <Ionicons name="trash" size={16} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    ) : (
                                        <Text className="text-gray-500 text-center py-2">No members selected</Text>
                                    )}
                                </View>
                            </ScrollView>

                            <TouchableOpacity
                                onPress={() => setVisible(false)}
                                className="bg-teal-600 rounded-md py-3"
                            >
                                <Text className="text-center text-white font-semibold">
                                    Save Team Members
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}