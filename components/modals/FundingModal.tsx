import { PaymentMethodOptions, Project } from "@/types";
import { useEffect, useState } from "react";
import {
    Modal,
    TouchableWithoutFeedback,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import DropdownInput from "../ui/DropDownInput";

// ============================================================================
// Types & Interfaces
// ============================================================================

interface Props {
    visible: boolean;
    project: Project;
    onClose: () => void;
}

interface ConfirmationViewProps {
    project: Project;
    amount: string;
    paymentMethod: string;
    ready: boolean;
    buttonClassName: string;
    onSave: () => void;
}

interface ConfirmationRowProps {
    label: string;
    value: string;
}

interface FundingFormViewProps {
    project: Project;
    amount: string;
    paymentMethod: string;
    ready: boolean;
    buttonClassName: string;
    onAmountChange: (value: string) => void;
    onPaymentMethodChange: (value: string) => void;
    onContinue: () => void;
}

interface PaymentSuccessfulProps {
    project: Project;
    onClose: () => void;
}

// ============================================================================
// Main Component
// ============================================================================

export default function FundingModal({ visible, project, onClose }: Props) {
    // State management
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [ready, setReady] = useState(false);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [showSuccessBox, setShowSuccessBox] = useState(false);

    // Update ready state when amount and payment method are filled
    useEffect(() => {
        setReady(Boolean(amount && paymentMethod));
    }, [amount, paymentMethod]);

    // Event handlers
    const handleSave = () => {
        setShowConfirmBox(false);
        setShowSuccessBox(true);
    };

    const handleContinue = () => {
        setShowConfirmBox(true);
    };

    const handleSuccessClose = () => {
        setShowSuccessBox(false);
        onClose();
    };

    // Shared button styles
    const buttonClassName = ready
        ? "bg-teal-600 rounded-md py-3 mt-6"
        : "bg-gray-400 rounded-md py-3 mt-6";

    // Render current view based on state
    const renderContent = () => {
        if (showSuccessBox) {
            return (
                <PaymentSuccessful project={project} onClose={handleSuccessClose} />
            );
        }

        if (showConfirmBox) {
            return (
                <ConfirmationView
                    project={project}
                    amount={amount}
                    paymentMethod={paymentMethod}
                    ready={ready}
                    buttonClassName={buttonClassName}
                    onSave={handleSave}
                />
            );
        }

        return (
            <FundingFormView
                project={project}
                amount={amount}
                paymentMethod={paymentMethod}
                ready={ready}
                buttonClassName={buttonClassName}
                onAmountChange={setAmount}
                onPaymentMethodChange={setPaymentMethod}
                onContinue={handleContinue}
            />
        );
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 bg-black/40 justify-center items-center p-4">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-full rounded-3xl p-5 shadow-lg">
                            {renderContent()}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

// ============================================================================
// Sub-Components
// ============================================================================

/**
 * Funding Form View - Initial step for entering amount and payment method
 */
function FundingFormView({
    project,
    amount,
    paymentMethod,
    ready,
    buttonClassName,
    onAmountChange,
    onPaymentMethodChange,
    onContinue,
}: FundingFormViewProps) {
    return (
        <>
            <Text className="text-center text-lg font-semibold text-teal-600 mb-4">
                Funding {project.title}
            </Text>

            <View className="space-y-4">
                {/* Amount Input */}
                <View>
                    <Text className="text-lg font-semibold text-gray-700 mb-2">
                        Enter amount
                    </Text>
                    <TextInput
                        placeholder="Enter funding goal amount"
                        className="bg-white rounded-lg px-3 py-3 border border-gray-200"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={onAmountChange}
                    />
                </View>

                {/* Payment Method Dropdown */}
                <View>
                    <DropdownInput
                        label="Payment Method"
                        placeholder="Select Payment Method"
                        value={paymentMethod}
                        options={PaymentMethodOptions}
                        onChange={onPaymentMethodChange}
                    />
                </View>
            </View>

            <TouchableOpacity
                onPress={onContinue}
                disabled={!ready}
                className={buttonClassName}
            >
                <Text className="text-center text-white font-semibold">
                    Continue to Confirmation
                </Text>
            </TouchableOpacity>
        </>
    );
}

/**
 * Confirmation View - Second step for reviewing funding details
 */
function ConfirmationView({
    project,
    amount,
    paymentMethod,
    ready,
    buttonClassName,
    onSave,
}: ConfirmationViewProps) {
    return (
        <>
            <Text className="text-center text-xl font-bold text-teal-600 mb-4">
                Confirm Your Funding
            </Text>

            <View className="space-y-4">
                <ConfirmationRow label="Project" value={project.title} />
                <ConfirmationRow label="Amount" value={amount} />
                <ConfirmationRow label="Payment Method" value={paymentMethod} />
            </View>

            <TouchableOpacity
                onPress={onSave}
                disabled={!ready}
                className={buttonClassName}
            >
                <Text className="text-center text-white font-semibold">
                    Save Funding Information
                </Text>
            </TouchableOpacity>
        </>
    );
}

/**
 * Confirmation Row - Displays a label-value pair in the confirmation view
 */
function ConfirmationRow({ label, value }: ConfirmationRowProps) {
    return (
        <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-gray-700 mb-2">{label}</Text>
            <Text className="text-sm text-gray-700 mb-2">{value}</Text>
        </View>
    );
}

/**
 * Payment Successful - Final step showing success message
 */
function PaymentSuccessful({ project, onClose }: PaymentSuccessfulProps) {
    return (
        <>
            <Text className="text-center text-2xl font-bold text-teal-600 mb-6">
                Payment Successful! 🎉
            </Text>

            <View className="space-y-3 mb-6">
                <Text className="text-center text-gray-700 text-base">
                    Thank you for supporting{" "}
                    <Text className="font-semibold">{project.title}</Text>
                </Text>
                <Text className="text-center text-gray-600 text-sm">
                    Your funding receipt has been sent to your email
                </Text>
            </View>

            <TouchableOpacity
                onPress={onClose}
                className="bg-teal-600 rounded-md py-3"
            >
                <Text className="text-center text-white font-semibold">Close</Text>
            </TouchableOpacity>
        </>
    );
}