import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import ProjectMember from "@/components/project/projectMember";
import { useProjects } from "@/contexts/ProjectContext";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import useProjectAction from "@/hooks/useProjectAction";
import FundingModal from "@/components/modals/FundingModal";

export default function ProjectScreen() {
    const { currentProject, loading, findById } = useProjects()
    const { shareProject } = useProjectAction()
    const [showFundingModal, setShowFundingModal] = useState(false)

    const params = useLocalSearchParams()
    const id = params.id as string
    const { userType, user } = useAuth()

    useEffect(() => {
        if (!id) return
        findById(id)
    }, [id])

    const handleFundFollowBtn = () => {
        if (userType === "SPONSOR") {
            setShowFundingModal(true)
        } else {

        }
    }

    if (loading) return (
        <View className="flex-1 bg-white items-center justify-center">
            <Text className="text-gray-500 text-center">Loading...</Text>
            <TouchableOpacity className="absolute left-5 top-10 bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                onPress={() => router.back()}>
                <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center " />
            </TouchableOpacity>
        </View>
    )
    if (!currentProject) return (
        <View className="flex-1 bg-white items-center justify-center">
            <Text className="text-gray-500 text-center">No project selected</Text>
            <TouchableOpacity className="absolute left-5 top-10 bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                onPress={() => router.back()}>
                <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center " />
            </TouchableOpacity>
        </View>
    )
    const isOwner = user && (user.id === currentProject.owner.id)
    console.log(user, currentProject.owner)
    const progress = currentProject.fundingInfo.raised / currentProject.fundingInfo.goal

    return (
        <View className="flex-1 bg-white items-center">
            <StatusBar style="light" />
            <TouchableOpacity className="absolute left-5 top-10 bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                onPress={() => router.back()}>
                <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center " />
            </TouchableOpacity>
            <Image source={{ uri: currentProject.logo }}
                className="w-full h-[60%]"
                resizeMode="cover"
            />
            <ScrollView className="py-10 px-4 bg-white absolute top-[30%] rounded-t-[50] h-[70%] w-full "
                contentContainerClassName="w-full  gap-y-4 pb-40"
                showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                        <Text className="font-bold text-xl">{currentProject.title}</Text>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                        <TouchableOpacity
                            onPress={() => shareProject(currentProject.id)}
                            className="bg-blue-600 p-2 rounded-full"
                        >
                            <Ionicons name="share-social" size={16} color="white" />
                        </TouchableOpacity>
                        {isOwner && <TouchableOpacity
                            onPress={() => router.push(`/project/edit`)}
                            className="bg-teal-600 p-2 rounded-full"
                        >
                            <Ionicons name="pencil" size={16} color="white" />
                        </TouchableOpacity>
                        }
                        <Text className="text-black bg-teal-100 text-xs border border-teal-500  px-2 py-1 rounded-full">
                            {currentProject.category}
                        </Text>
                    </View>
                </View>
                <View className="flex-col gap-y-2">
                    <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-50">
                        <View
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${Math.min(progress * 100, 100)}%` }}
                        />
                    </View>
                    <View className="flex-row justify-between">
                        <View className="flex-col gap-y-0">
                            <Text className="text-sm">Fund Raised</Text>
                            <Text className="font-bold text-lg">${currentProject.fundingInfo.raised}</Text>
                        </View>
                        <View className="flex-col gap-y-0">
                            <Text className="text-sm">Target</Text>
                            <Text className="font-bold text-lg text-teal-500">${currentProject.fundingInfo.goal}</Text>
                        </View>
                    </View>
                </View>
                <Text className="font-semibold">
                    {currentProject.description}
                </Text>
                <View className="flex-row gap-x-2 items-start">
                    <View className=" flex-row gap-x-1 items-center">
                        <Text className="font-bold text-teal-500 items-center">
                            Mission
                        </Text>
                        <Ionicons name="arrow-forward" size={15} color="black" />
                    </View>
                    <Text className=" test-sm flex-1">
                        {currentProject?.mission}
                    </Text>
                </View>
                <View className="flex-row gap-x-2 items-start">
                    <View className=" flex-row gap-x-1 items-center">
                        <Text className="font-bold text-teal-500 items-center">
                            Vision
                        </Text>
                        <Ionicons name="arrow-forward" size={15} color="black" />
                    </View>
                    <Text className=" test-sm flex-1">
                        {currentProject.vision}
                    </Text>
                </View>
                <View className="items-center gap-y-2">
                    <Text className="font-bold text-xl text-teal-500">Key Features</Text>
                    {currentProject.keyFeature.split(',').map((feature, index) => (
                        <View className="flex-row gap-x-2 items-center" key={index}>
                            <Octicons name="dot-fill" size={15} color="black" />
                            <Text className="test-sm flex-1">
                                {feature}
                            </Text>
                        </View>
                    ))}
                </View>
                <View className="items-center gap-y-2">
                    <Text className="font-bold text-xl text-teal-500 w-full">Team</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerClassName="gap-x-4">
                        {currentProject.team && currentProject.team.length > 0 ? (
                            currentProject.team.map((member, index) => (
                                <ProjectMember key={index} member={member} />
                            ))
                        ) : (
                            <View className="flex-1 justify-center items-center py-4">
                                <Text className="text-gray-500 text-center">No team members added yet</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
                <View className="items-center gap-y-2 relative">
                    <Text className="font-bold text-xl text-teal-500 w-full">MileStone</Text>
                    <View className="relative w-full">
                        <View className="absolute top-1/2 -translate-y-1/2 w-full border-4 rounded-full border-teal-500" />
                        <View className="items-center gap-x-2 flex-row justify-between">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <View
                                    key={i}
                                    className={`w-6 h-6 rounded-full border-2 ${i <= 2 ? "border-teal-500 bg-white" : "border-gray-300 bg-white"
                                        } flex items-center justify-center z-10`}
                                >
                                    {i === 2 && (
                                        <Image className="absolute top-8 -left-2 w-12 h-12"
                                            resizeMode="contain"
                                            source={require('@/assets/components/milestone.png')} />
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>
                    <View className="px-4 w-full">
                        <View className="border-2 mt-12 border-teal-500 rounded-xl p-4 gap-y-4">
                            <View className="flex-row gap-x-2 items-center ">
                                <Text className=" font-bold text-teal-500 text-lg">
                                    {currentProject?.milestones[0].title}
                                </Text>
                                <Text className="text-gray-400 text-sm ">{currentProject?.milestones[0].status}</Text>
                            </View>
                            <View className="flex-1">
                                {currentProject?.milestones[0].description.split(',').map((feature, index) => (
                                    <View className="flex-row gap-x-2 items-center" key={index}>
                                        <Octicons name="dot-fill" size={10} color="black" />
                                        <Text className="test-sm flex-1">
                                            {feature}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                            <View className="gap-y-1 items-start">
                                <View className="flex-row gap-x-2 items-center">
                                    <Text className="font-bold text-teal-500 ">Completion:
                                    </Text>
                                    <Text className="">{new Date(currentProject?.milestones[0].completionDate!).toDateString()}</Text>
                                </View>
                                <View className="flex-row gap-x-2 items-center">
                                    <Text className="font-bold text-teal-500 ">Total funds:
                                    </Text>
                                    <Text className="">${currentProject.milestones[0].budget}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="w-full ">
                    <Text className="font-bold text-xl text-teal-500">Funding Info</Text>
                    <View className="w-full ml-4">
                        <View className="gap-x-2 items-center w-full flex-row">
                            <Text className="font-bold">Project Name:</Text>
                            <Text>{currentProject.title}</Text>
                        </View>
                        <View className="gap-x-2 items-center w-full flex-row">
                            <Text className="font-bold">Funding Goal:</Text>
                            <Text>${currentProject.fundingInfo.goal}</Text>
                        </View>
                        <View className="gap-x-2 items-center w-full flex-row">
                            <Text className="font-bold">Current raised:</Text>
                            <Text>${currentProject.fundingInfo.raised}</Text>
                        </View>
                        <View className="gap-x-2 items-center w-full flex-row">
                            <Text className="font-bold">Donors:</Text>
                            <Text>{currentProject.donations.length} contributors</Text>
                        </View>
                    </View>
                </View>
                <View className="w-full ">
                    <Text className="font-bold text-xl text-teal-500">Links and Docs</Text>
                    <View className="w-full ml-4">
                        {currentProject?.links.map((link, index) => (
                            <View className="gap-x-2 items-center w-full flex-row" key={index}>
                                <Text className="font-bold">{link.label}:</Text>
                                <Text>{link.url}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            {showFundingModal && <FundingModal
                onClose={() => setShowFundingModal(false)}
                project={currentProject}
                visible={showFundingModal}
            />}
            <TouchableOpacity className="absolute bottom-14  bg-teal-500/80 py-4 px-8 rounded-full"
                onPress={handleFundFollowBtn}
            >
                <Text className="text-white font-semibold text-lg">
                    {userType === "SPONSOR" ? "Contribute" : "Follow"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}