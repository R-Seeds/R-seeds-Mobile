import {
    Modal,
    TouchableWithoutFeedback,
    View,
    Text,
    TouchableOpacity,
} from "react-native";

// ============================================================================
// Types & Interfaces
// ============================================================================

interface Props {
    visible: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;  // Returns true
    onCancel: () => void;   // Returns false
}

// ============================================================================
// Main Component
// ============================================================================

export default function ConfirmModal({
    visible,
    title = "Confirm Action",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}: Props) {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={onCancel}>
                <View className="flex-1 bg-black/40 justify-center items-center p-4">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-full rounded-3xl p-5 shadow-lg">
                            {/* Title */}
                            <Text className="text-center text-xl font-bold text-teal-600 mb-4">
                                {title}
                            </Text>

                            {/* Message */}
                            <Text className="text-center text-gray-700 text-base mb-6">
                                {message}
                            </Text>

                            {/* Action Buttons */}
                            <View className="flex-row gap-3">
                                {/* Cancel Button */}
                                <TouchableOpacity
                                    onPress={onCancel}
                                    className="flex-1 bg-gray-400 rounded-md py-3"
                                >
                                    <Text className="text-center text-white font-semibold">
                                        {cancelText}
                                    </Text>
                                </TouchableOpacity>

                                {/* Confirm Button */}
                                <TouchableOpacity
                                    onPress={onConfirm}
                                    className="flex-1 bg-teal-600 rounded-md py-3"
                                >
                                    <Text className="text-center text-white font-semibold">
                                        {confirmText}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}