import { Modal, Text, TouchableOpacity, View, TextInput } from "react-native";
import { BlurView } from "expo-blur";
import { UserType } from "@/types";
import { useState } from "react";

interface RoleSelectionModalProps {
    visible: boolean;
    onSelectRole: (role: UserType, additionalData?: {
        finishYear?: number;
        organization?: string;
        country?: string;
    }) => void;
    onCancel: () => void;
}

export default function RoleSelectionModal({ visible, onSelectRole, onCancel }: RoleSelectionModalProps) {
    const [selectedRole, setSelectedRole] = useState<UserType | null>(null);
    const [finishYear, setFinishYear] = useState('');
    const [organization, setOrganization] = useState('');
    const [country, setCountry] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    const handleRoleSelect = (role: UserType) => {
        setSelectedRole(role);
        setShowInputs(true);
    };

    const handleConfirm = () => {
        if (!selectedRole) return;

        const additionalData: {
            finishYear?: number;
            organization?: string;
            country?: string;
        } = {};

        if (selectedRole === UserType.GRADUATE && finishYear) {
            additionalData.finishYear = parseInt(finishYear);
        }
        if (selectedRole === UserType.SPONSOR && organization) {
            additionalData.organization = organization;
        }
        if (selectedRole === UserType.USER && country) {
            additionalData.country = country;
        }

        onSelectRole(selectedRole, additionalData);
        // Reset state
        setSelectedRole(null);
        setFinishYear('');
        setOrganization('');
        setCountry('');
        setShowInputs(false);
    };

    const handleCancel = () => {
        setSelectedRole(null);
        setFinishYear('');
        setOrganization('');
        setCountry('');
        setShowInputs(false);
        onCancel();
    };

    const renderInputFields = () => {
        if (!showInputs || !selectedRole) return null;

        return (
            <View className="gap-y-3 mt-4">
                {selectedRole === UserType.GRADUATE && (
                    <View>
                        <Text className="text-white/80 text-sm mb-2">Graduation Year</Text>
                        <TextInput
                            className="p-3 rounded-2xl bg-white/10 border border-white/20 text-white"
                            placeholder="e.g., 2024"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            value={finishYear}
                            onChangeText={setFinishYear}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                    </View>
                )}

                {selectedRole === UserType.SPONSOR && (
                    <View>
                        <Text className="text-white/80 text-sm mb-2">Organization</Text>
                        <TextInput
                            className="p-3 rounded-2xl bg-white/10 border border-white/20 text-white"
                            placeholder="Your organization name"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            value={organization}
                            onChangeText={setOrganization}
                        />
                    </View>
                )}

                {selectedRole === UserType.USER && (
                    <View>
                        <Text className="text-white/80 text-sm mb-2">Country (Optional)</Text>
                        <TextInput
                            className="p-3 rounded-2xl bg-white/10 border border-white/20 text-white"
                            placeholder="Your country"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            value={country}
                            onChangeText={setCountry}
                        />
                    </View>
                )}
            </View>
        );
    };

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
                            <Text className="text-2xl font-bold text-white/90">
                                {showInputs ? 'Additional Information' : 'Select Your Role'}
                            </Text>
                            <Text className="text-white/70 text-center mt-2">
                                {showInputs
                                    ? `Complete your ${selectedRole?.toLowerCase()} profile`
                                    : 'Choose how you\'d like to join R-Seeds'
                                }
                            </Text>
                        </View>

                        {!showInputs ? (
                            <View className="gap-y-3">
                                <TouchableOpacity
                                    className="p-4 rounded-2xl bg-teal-600/30 border border-white/20 active:bg-teal-700"
                                    onPress={() => handleRoleSelect(UserType.GRADUATE)}
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
                                    onPress={() => handleRoleSelect(UserType.SPONSOR)}
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
                                    onPress={() => handleRoleSelect(UserType.USER)}
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
                        ) : (
                            <View>
                                <View className="p-4 rounded-2xl bg-teal-600/20 border border-white/20 mb-4">
                                    <View className="flex-row items-center">
                                        <Text className="text-2xl mr-3">
                                            {selectedRole === UserType.GRADUATE ? '🎓' :
                                                selectedRole === UserType.SPONSOR ? '💰' : '👥'}
                                        </Text>
                                        <Text className="text-white font-bold text-lg">
                                            {selectedRole === UserType.GRADUATE ? 'Graduate' :
                                                selectedRole === UserType.SPONSOR ? 'Sponsor' : 'User'}
                                        </Text>
                                    </View>
                                </View>
                                {renderInputFields()}
                            </View>
                        )}

                        <View className="gap-y-3">
                            {showInputs && (
                                <TouchableOpacity
                                    className="p-3 rounded-2xl bg-teal-600/60 border border-white/20"
                                    onPress={handleConfirm}
                                >
                                    <Text className="text-white font-semibold text-center">Continue</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                className="p-3 rounded-2xl border border-white/20 bg-red-600/40"
                                onPress={handleCancel}
                            >
                                <Text className="text-white/80 text-center font-semibold">
                                    {showInputs ? 'Back' : 'Cancel'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>
            </View>
        </Modal>
    );
}
