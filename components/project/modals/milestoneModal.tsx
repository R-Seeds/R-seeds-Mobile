import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Milestone, MilestoneStatus } from "@/types";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";

interface Props {
    visible: boolean;
    onClose: () => void;
    milestones: Milestone[];
    setMilestones: (milestones: Milestone[]) => void;
    addMilestone: (milestone: Milestone) => void;
    removeMilestone: (index: number) => void;
}

export default function MilestoneModal({ visible, onClose, milestones, setMilestones, addMilestone, removeMilestone }: Props) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentEditingMilestone, setCurrentEditingMilestone] = useState<number | null>(null);

    const formatDateToISO = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T00:00:00`;
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate && currentEditingMilestone !== null) {
            const updated = [...milestones];
            updated[currentEditingMilestone].completionDate = formatDateToISO(selectedDate);
            setMilestones(updated);
        }
        setCurrentEditingMilestone(null);
    };

    const openDatePicker = (index: number) => {
        setCurrentEditingMilestone(index);
        setShowDatePicker(true);
    };

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
                                Milestones
                            </Text>

                            {milestones.map((milestone, index) => (
                                <View
                                    key={index}
                                    className="bg-gray-100 rounded-xl p-3 mb-4 gap-y-2"
                                >
                                    <TextInput
                                        placeholder="Milestone Title"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={milestone.title}
                                        onChangeText={(t) => {
                                            const updated = [...milestones];
                                            updated[index].title = t;
                                            setMilestones(updated);
                                        }}
                                    />

                                    <TextInput
                                        placeholder="Short Description"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={milestone.description}
                                        onChangeText={(t) => {
                                            const updated = [...milestones];
                                            updated[index].description = t;
                                            setMilestones(updated);
                                        }}
                                    />

                                

                                    <TextInput
                                        placeholder="Budget"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        keyboardType="numeric"
                                        value={milestone.budget?.toString()}
                                        onChangeText={(t) => {
                                            const updated = [...milestones];
                                            updated[index].budget = Number(t) || 0;
                                            setMilestones(updated);
                                        }}
                                    />

                                    <TextInput
                                        placeholder="Expected Completion Date"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={milestone.completionDate ? new Date(milestone.completionDate).toLocaleDateString() : ""}
                                        editable={false}
                                    />
                                    <TouchableOpacity
                                        onPress={() => openDatePicker(index)}
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200 flex-row justify-between items-center"
                                    >
                                        <Text className="text-gray-500">
                                            {milestone.completionDate ? "Change Date" : "Select Date"}
                                        </Text>
                                        <Ionicons name="calendar" size={18} color="#555" />
                                    </TouchableOpacity>

                                    {milestones.length > 1 && (
                                        <TouchableOpacity
                                            onPress={() => removeMilestone(index)}
                                            className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                                        >
                                            <Ionicons name="trash" size={16} color="white" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={() => {
                                    const newMilestone: Milestone = {
                                        title: "",
                                        description: "",
                                        completionDate: "",
                                        budget: 0,
                                        status: MilestoneStatus.IN_PROGRESS,
                                    };
                                    addMilestone(newMilestone);
                                }}
                                className="border border-dashed border-gray-400 rounded-full py-2 mb-4"
                            >
                                <Text className="text-center text-gray-600">
                                    Add Another Milestone
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={onClose}
                                className="bg-teal-600 rounded-md py-3"
                            >
                                <Text className="text-center text-white font-semibold">
                                    Save Project Milestone
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={currentEditingMilestone !== null && milestones[currentEditingMilestone]?.completionDate
                                        ? new Date(milestones[currentEditingMilestone].completionDate)
                                        : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                    minimumDate={new Date()}
                                />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
