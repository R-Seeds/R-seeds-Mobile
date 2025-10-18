import { Ionicons } from "@expo/vector-icons";
import { View, Modal, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    members: { graduate: string; role: string }[];
    setMembers: (members: { graduate: string; role: string }[]) => void;
    addMember: () => void;
    removeMember: (index: number) => void;
}

export default function TeamMemberModal({visible,setVisible,members,setMembers,addMember,removeMember}:Props) {
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
                        <View className="bg-white w-full rounded-3xl p-5 shadow-lg">
                            <Text className="text-center text-lg font-semibold text-teal-600 mb-4">
                                Team Members
                            </Text>

                            {members.map((member, index) => (
                                <View key={index} className="flex-row items-center mb-3 space-x-2">
                                    <TouchableOpacity className="flex-1 border border-gray-300 rounded-lg px-3 py-2">
                                        <Text className="text-gray-500">Search Graduate</Text>
                                    </TouchableOpacity>

                                    <TextInput
                                        placeholder="Role (e.g. UI|UX Designer)"
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                                        placeholderTextColor="#999"
                                        value={member.role}
                                        onChangeText={(text) => {
                                            const newMembers = [...members];
                                            newMembers[index].role = text;
                                            setMembers(newMembers);
                                        }}
                                    />

                                    <TouchableOpacity
                                        onPress={() => removeMember(index)}
                                        className="bg-red-500 rounded-lg p-2"
                                    >
                                        <Ionicons name="trash" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={addMember}
                                className="border border-dashed border-gray-400 rounded-full py-2 mt-2 mb-4"
                            >
                                <Text className="text-center text-gray-600">
                                    Add Another Member
                                </Text>
                            </TouchableOpacity>

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