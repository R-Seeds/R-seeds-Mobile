import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProjectLink } from "@/types";

interface Props {
    visible: boolean;
    onClose: () => void;
    links: ProjectLink[];
    setLinks: (links: ProjectLink[]) => void;
    addLink: (link: ProjectLink) => void;
    removeLink: (index: number) => void;
}

export default function LinksModal({ visible, onClose, links, setLinks, addLink, removeLink }: Props) {

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
                                Links & Documents
                            </Text>

                            {links.map((link, index) => (
                                <View
                                    key={index}
                                    className="bg-gray-100 rounded-xl p-3 mb-4 space-y-2"
                                >
                                    <TextInput
                                        placeholder="Link Label"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={link.label}
                                        onChangeText={(t) => {
                                            const updated = [...links];
                                            updated[index].label = t;
                                            setLinks(updated);
                                        }}
                                    />

                                    <TextInput
                                        placeholder="URL"
                                        className="bg-white rounded-lg px-3 py-2 border border-gray-200"
                                        value={link.url}
                                        onChangeText={(t) => {
                                            const updated = [...links];
                                            updated[index].url = t;
                                            setLinks(updated);
                                        }}
                                    />

                                    
                                  
                                    {links.length > 1 && (
                                        <TouchableOpacity
                                            onPress={() => removeLink(index)}
                                            className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                                        >
                                            <Ionicons name="trash" size={16} color="white" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={() => {
                                    const newLink: ProjectLink = {
                                        label: "",
                                        url: "",
                                    };
                                    addLink(newLink);
                                }}
                                className="border border-dashed border-gray-400 rounded-full py-2 mb-4"
                            >
                                <Text className="text-center text-gray-600">
                                    Add Another Link
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={onClose}
                                className="bg-teal-600 rounded-md py-3"
                            >
                                <Text className="text-center text-white font-semibold">
                                    Save Project Links
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
