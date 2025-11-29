import { View, Text, TouchableOpacity, Image, Modal, TextInput, Alert } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from "expo-router";
import { Project } from "@/types";
import { useProjects } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import useProjectAction from "@/hooks/useProjectAction";
import { useState } from "react";
import FundingModal from "../modals/FundingModal";

export default function CardProject({ project }: { project: Project }) {
    const { setCurrentProject } = useProjects()
    const { userType } = useAuth()

    const [modalVisible, setModalVisible] = useState(false)
    const [showFundingModal, setShowFundingModal] = useState(false)
    const [comment, setComment] = useState('')

    const { likeProject, unlikeProject, commentProject, shareProject, addDonor } = useProjectAction()

    const handleCommentSubmit = async () => {
        if (comment.trim()) {
            await commentProject(project.id, comment)
            setComment('')
            setModalVisible(false)
        } else {
            Alert.alert('Error', 'Please enter a comment')
        }
    }

    const handleCommentCancel = () => {
        setComment('')
        setModalVisible(false)
    }
    return (
        <View className=" w-full items-center border border-gray-300 rounded-2xl ">
            <View className="flex-row justify-between items-center p-4 w-full ">
                <View className="flex-row  items-center gap-x-2">
                    <Image source={{ uri: project.logo }}
                        resizeMode="cover"
                        className="w-10 h-10 rounded-full " />
                    <Text className="text-lg font-bold">{project.title}</Text>
                </View>
                <TouchableOpacity className="">
                    <Entypo name="dots-three-horizontal" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: project.logo }}
                resizeMode="cover"
                className="w-full h-96 rounded-2xl " />
            <View className="items-center flex-row gap-x-6 bg-white rounded-2xl bottom-10 p-4">
                <TouchableOpacity className="items-center flex-col gap-y-2"
                    onPress={() => likeProject(project.id)}>
                    <Entypo name="heart-outlined" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">{project.interaction.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2"
                    onPress={() => setModalVisible(true)}>
                    <Ionicons name="chatbubble-outline" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">{project.interaction.comments.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2"
                    onPress={() => console.log("Not implemented")}>
                    <FontAwesome6 name="bookmark" size={24} color="white" className="bg-teal-500 p-1 rounded-full h-10 w-10 text-center" />
                    <Text className="text-sm text-teal-500 font-semibold">0</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center flex-col gap-y-2"
                    onPress={() => shareProject(project.id)}>
                    <Entypo name="forward" size={24} color="white" className="bg-teal-500 p-1 rounded-full" />
                    <Text className="text-sm text-teal-500 font-semibold">{project.interaction.shares}</Text>
                </TouchableOpacity>
            </View>
            <View className="w-full px-4 gap-y-4 bottom-10">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-semibold">{project.title}</Text>
                    <View className="gap-x-2 flex-row">
                        <EvilIcons name="eye" size={24} color="black" />
                        <Text className="text-sm text-gray-500 font-semibold">{project.interaction.views} Views</Text>
                    </View>
                </View>
                <Text className="text-sm text-black ">
                    {project.description}
                </Text>
                <Text className="text-sm text-black font-semibold">
                    Raised ${project.fundingInfo.raised} of {project.fundingInfo.goal}
                </Text>
            </View>
            <View className="flex-row justify-between items-center gap-x-10 px-4 pb-4">
                <TouchableOpacity className="border flex-1 border-teal-500 px-4 py-2 rounded-xl items-center"
                    onPress={() => { setCurrentProject(project); router.push('/project/spotlight') }}>
                    <Text className="text-teal-500 font-semibold">View Project</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-teal-500 flex-1 px-4 py-2 rounded-xl items-center"
                    onPress={() => setShowFundingModal(true)}>
                    <Text className="text-white font-semibold">
                        {userType === "SPONSOR" ? "Fund Now" : "Follow"}
                    </Text>
                </TouchableOpacity>
            </View>
            {showFundingModal && <FundingModal
                onClose={() => setShowFundingModal(false)}
                project={project}
                visible={showFundingModal}
            />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-lg w-80">
                        <Text className="text-lg font-bold mb-4">Add Comment</Text>
                        <TextInput
                            className="border border-gray-300 p-2 rounded mb-4"
                            placeholder="Enter your comment"
                            value={comment}
                            onChangeText={setComment}
                            multiline
                            numberOfLines={4}
                        />
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                className="bg-gray-500 px-4 py-2 rounded"
                                onPress={handleCommentCancel}
                            >
                                <Text className="text-white">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-teal-500 px-4 py-2 rounded"
                                onPress={handleCommentSubmit}
                            >
                                <Text className="text-white">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}