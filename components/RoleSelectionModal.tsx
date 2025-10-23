import { Modal, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { UserType } from "@/types";

interface RoleSelectionModalProps {
    visible: boolean;
    onSelectRole: (role: UserType) => void;
    onCancel: () => void;
}

export default function RoleSelectionModal({ visible, onSelectRole, onCancel }: RoleSelectionModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View className="flex-1 items-center justify-center bg-black/80">
                <View className="rounded-3xl overflow-hidden border border-white/20 w-96 mx-4">
                    <BlurView
                        tint="dark"
                        intensity={80}
                        experimentalBlurMethod="dimezisBlurView"
                        className="p-6 gap-y-6"
                    >
                        <View className="flex items-center">
                            <Text className="text-2xl font-bold text-white/90">Select Your Role</Text>
                            <Text className="text-white/70 text-center mt-2">
                                Choose how you&apos;d like to join R-Seeds
                            </Text>
                        </View>

                        <View className="gap-y-3">
                            <TouchableOpacity
                                className="p-4 rounded-2xl bg-teal-600/30 border border-white/20 active:bg-teal-700"
                                onPress={() => onSelectRole(UserType.GRADUATE)}
                            >
                                <View className="flex-row items-center">
                                    <Text className="text-3xl mr-3">🎓</Text>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold text-lg">Graduate</Text>
                                        <Text className="text-white/70 text-sm">RCA Alumni & Students</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="p-4 rounded-2xl bg-teal-600/30 border border-white/20 active:bg-teal-700"
                                onPress={() => onSelectRole(UserType.SPONSOR)}
                            >
                                <View className="flex-row items-center">
                                    <Text className="text-3xl mr-3">💰</Text>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold text-lg">Sponsor</Text>
                                        <Text className="text-white/70 text-sm">Support innovative projects</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="p-4 rounded-2xl bg-teal-600/30 border border-white/20 active:bg-teal-700"
                                onPress={() => onSelectRole(UserType.USER)}
                            >
                                <View className="flex-row items-center">
                                    <Text className="text-3xl mr-3">👥</Text>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold text-lg">User</Text>
                                        <Text className="text-white/70 text-sm">Explore and engage</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            className="p-3 rounded-2xl border border-white/20 bg-red-600/40"
                            onPress={onCancel}
                        >
                            <Text className="text-white/80 text-center font-semibold">Cancel</Text>
                        </TouchableOpacity>
                    </BlurView>
                </View>
            </View>
        </Modal>
    );
}
