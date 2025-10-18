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
    milestones: { title: string; description: string; status: string; budget: string; date: string }[];
    setMilestones: (milestones: { title: string; description: string; status: string; budget: string; date: string }[]) => void;
    addMilestone: () => void;
    removeMilestone: (index: number) => void;
}

export default function MilestoneModal({ visible, onClose, milestones, setMilestones, addMilestone, removeMilestone }: Props) {

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
                                    className="bg-gray-100 rounded-xl p-3 mb-4 space-y-2"
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

                                    <TouchableOpacity className="bg-white rounded-lg px-3 py-2 border border-gray-200 flex-row justify-between items-center">
                                        <Text className="text-gray-500">
                                            {milestone.status || "Status"}
                                        </Text>
                                        <Ionicons name="chevron-down" size={18} color="#555" />
                                    </TouchableOpacity>

                                    <TextInput
                                        placeholder="Budget"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        keyboardType="numeric"
                                        value={milestone.budget}
                                        onChangeText={(t) => {
                                            const updated = [...milestones];
                                            updated[index].budget = t;
                                            setMilestones(updated);
                                        }}
                                    />

                                    <TextInput
                                        placeholder="Expected Completion Date"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={milestone.date}
                                        onChangeText={(t) => {
                                            const updated = [...milestones];
                                            updated[index].date = t;
                                            setMilestones(updated);
                                        }}
                                    />

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
                                onPress={addMilestone}
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
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
