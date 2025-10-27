import { Modal, View, ActivityIndicator } from 'react-native';

type LoadingProps = {
    visible: boolean;
};

export default function LoadingModal({ visible }: LoadingProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View className="flex-1 justify-center items-center bg-black/30">
                <View className="bg-white p-8 rounded-lg">
                    <ActivityIndicator size="large" color="#00C896" />
                </View>
            </View>
        </Modal>
    );
}