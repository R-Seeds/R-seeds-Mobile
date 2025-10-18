import Input from "@/components/ui/Input";
import InputArea from "@/components/ui/InputArea";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput, TouchableWithoutFeedback, ScrollView, Modal } from "react-native";

export default function CreateProjectScreen() {
    const [visible, setVisible] = useState(false);
    const [members, setMembers] = useState([{ graduate: "", role: "" }]);

    const addMember = () =>
        setMembers([...members, { graduate: "", role: "" }]);

    const removeMember = (index: number) =>
        setMembers(members.filter((_, i) => i !== index));
    return (
        <View className="flex-1 p-4">
            <View className="flex-row items-center gap-x-14 pt-4 ">
                <TouchableOpacity className=" bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                    onPress={() => router.back()}>
                    <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center " />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-teal-500">Add New Project</Text>
            </View>
            <ScrollView contentContainerClassName="pt-10 pb-20 gap-y-4"
                showsVerticalScrollIndicator={false}
            >
                <Input />
                <Input />
                <InputArea />
                <InputArea />
                <InputArea />
                <InputArea />
                <View className="gap-y-4 ">
                    <Text className="text-lg font-semibold">Team Member</Text>
                    <TouchableOpacity onPress={() => { setVisible(true) }}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center">
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Member</Text>
                    </TouchableOpacity>
                </View>
                <View className="gap-y-4 ">
                    <Text className="text-lg font-semibold">Project Milestone</Text>
                    <TouchableOpacity onPress={() => { setVisible(true) }}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center">
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Milestone</Text>
                    </TouchableOpacity>
                </View>
                <Input />
                <View className="gap-y-4 ">
                    <Text className="text-lg font-semibold">Link and Docs</Text>
                    <TouchableOpacity onPress={() => { setVisible(true) }}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center">
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Link</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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

        </View>
    )
}