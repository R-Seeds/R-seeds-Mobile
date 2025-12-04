import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ComingSoonModalProps = {
    visible: boolean;
    onClose: () => void;
    featureName?: string;
    description?: string;
};

export default function ComingSoonModal({
    visible,
    onClose,
    featureName = "This feature",
    description = "We're working hard to bring you this feature. Stay tuned for updates!"
}: ComingSoonModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50 px-6">
                <View className="bg-white w-full rounded-3xl p-6 items-center shadow-lg">
                    {/* Illustration/Icon */}
                    <View className="w-24 h-24 bg-teal-100 rounded-full items-center justify-center mb-4">
                        <Ionicons name="construct-outline" size={48} color="#14b8a6" />
                    </View>

                    {/* Title */}
                    <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
                        Coming Soon! 🚀
                    </Text>

                    {/* Feature Name */}
                    <Text className="text-lg font-semibold text-teal-500 text-center mb-3">
                        {featureName}
                    </Text>

                    {/* Description */}
                    <Text className="text-gray-500 text-center text-base mb-6 leading-6">
                        {description}
                    </Text>

                    {/* Progress indicator */}
                    <View className="flex-row items-center gap-x-2 mb-6">
                        <View className="w-2 h-2 bg-teal-500 rounded-full" />
                        <View className="w-2 h-2 bg-teal-300 rounded-full" />
                        <View className="w-2 h-2 bg-teal-200 rounded-full" />
                        <Text className="text-sm text-gray-400 ml-2">In Development</Text>
                    </View>

                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-teal-500 w-full py-4 rounded-xl items-center"
                    >
                        <Text className="text-white font-semibold text-lg">Got it!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
