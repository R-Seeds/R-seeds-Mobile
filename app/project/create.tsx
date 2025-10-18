import FundingInfoModal from "@/components/project/modals/fundingInfoModal";
import LinksModal from "@/components/project/modals/linksModal";
import TeamMemberModal from "@/components/project/modals/memberModal";
import MilestoneModal from "@/components/project/modals/milestoneModal";
import Input from "@/components/ui/Input";
import InputArea from "@/components/ui/InputArea";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import { FundingInfo, Graduate, Milestone, ProjectCategory, ProjectCreateRequest, ProjectLink, ProjectStatus, ProjectCategoryOptions } from "@/types";
import useProjectAction from "@/hooks/useProjectAction";
import DropdownInput from "@/components/ui/DropDownInput";
import * as ImagePicker from 'expo-image-picker';

export default function CreateProjectScreen() {
    const { createProject } = useProjectAction()
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<ProjectCategory>(ProjectCategory.EDUCATION);
    const [description, setDescription] = useState("");
    const [mission, setMission] = useState("");
    const [vision, setVision] = useState("");
    const [keyFeature, setKeyFeature] = useState("");
    const [memberVisible, setMemberVisible] = useState(false);
    const [mileStoneVisible, setMileStoneVisible] = useState(false);
    const [fundingVisible, setFundingVisible] = useState(false);
    const [linksVisible, setLinksVisible] = useState(false);

    const [members, setMembers] = useState<Graduate[]>([]);
    const [fundingInfo, setFundingInfo] = useState<FundingInfo>();
    const [links, setLinks] = useState<ProjectLink[]>([]);
    const [projectImage, setProjectImage] = useState<string | null>(null);

    const addMember = (graduate: Graduate) =>
        setMembers([...members, graduate]);

    const removeMember = (index: number) =>
        setMembers(members.filter((_, i) => i !== index));

    const [milestones, setMilestones] = useState<Milestone[]>([]);

    const addMilestone = (milestone: Milestone) =>
        setMilestones([...milestones, milestone]);

    const removeMilestone = (index: number) =>
        setMilestones(milestones.filter((_, i) => i !== index));

    const addFundingInfo = (fundingInfo: FundingInfo) =>
        setFundingInfo(fundingInfo);

    const removeFundingInfo = () =>
        setFundingInfo(undefined);

    const addLink = (link: ProjectLink) =>
        setLinks([...links, link]);

    const removeLink = (index: number) =>
        setLinks(links.filter((_, i) => i !== index));

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProjectImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to take photos!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProjectImage(result.assets[0].uri);
        }
    };

    const removeProjectImage = () => {
        setProjectImage(null);
    };

    const handleSubmit = async () => {

        if (!title || !category || !description || !mission || !vision || !keyFeature || !fundingInfo) {
            return
        }
        const projectData: ProjectCreateRequest = {
            title,
            status: ProjectStatus.ACTIVE,
            category,
            description,
            mission,
            vision,
            keyFeature,
            team: members,
            milestones,
            fundingInfo,
            links
        }
        await createProject(projectData)
    }

    return (
        <View className="flex-1 p-4 pb-10 bg-white">
            <View className="flex-row items-center gap-x-14 pt-4 ">
                <TouchableOpacity className=" bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                    onPress={() => router.back()}>
                    <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center " />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-teal-500">Add New Project</Text>
            </View>
            <ScrollView contentContainerClassName="pt-10 pb-20 gap-y-4"
                showsVerticalScrollIndicator={false}
            >
                <Input label="Title" value={title} setValue={setTitle} />
                <DropdownInput
                    label="Category"
                    placeholder="Select Category"
                    value={category}
                    options={ProjectCategoryOptions}
                    onChange={(data) => setCategory(data as ProjectCategory)} />
                <InputArea label="Description" value={description} setValue={setDescription} />
                <InputArea label="Mission" value={mission} setValue={setMission} />
                <InputArea label="Vision" value={vision} setValue={setVision} />
                <InputArea label="Key Features" value={keyFeature} setValue={setKeyFeature} />
                
                {/* Project Photo Upload Section */}
                <View className="gap-y-4">
                    <Text className="text-lg font-semibold">Project Photo</Text>
                    {projectImage ? (
                        <View className="relative">
                            <Image 
                                source={{ uri: projectImage }} 
                                className="w-full h-48 rounded-lg"
                                resizeMode="cover"
                            />
                            <TouchableOpacity 
                                onPress={removeProjectImage}
                                className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
                            >
                                <Ionicons name="close" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="border-2 border-dashed border-gray-300 rounded-lg p-8 items-center gap-y-4">
                            <Ionicons name="camera" size={48} color="#9CA3AF" />
                            <Text className="text-gray-500 text-center">Add a photo to showcase your project</Text>
                            <View className="flex-row gap-x-4">
                                <TouchableOpacity 
                                    onPress={takePhoto}
                                    className="bg-teal-500 rounded-lg px-6 py-3 flex-row items-center gap-x-2"
                                >
                                    <Ionicons name="camera" size={20} color="white" />
                                    <Text className="text-white font-semibold">Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={pickImage}
                                    className="bg-teal-500 rounded-lg px-6 py-3 flex-row items-center gap-x-2"
                                >
                                    <Ionicons name="images" size={20} color="white" />
                                    <Text className="text-white font-semibold">Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
                
                <View className="gap-y-4 ">
                    <Text className="text-lg font-semibold">Team Member</Text>
                    <TouchableOpacity onPress={() => { setMemberVisible(true) }}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center">
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Member</Text>
                    </TouchableOpacity>
                </View>
                <View className="gap-y-4 ">
                    <Text className="text-lg font-semibold">Project Milestone</Text>
                    <TouchableOpacity onPress={() => { setMileStoneVisible(true) }}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center">
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Milestone</Text>
                    </TouchableOpacity>
                </View>
                <View className="gap-y-4 ">
                    <Text className="text-lg font-semibold">Funding Info</Text>
                    <TouchableOpacity onPress={() => { setFundingVisible(true) }}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center">
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Funding</Text>
                    </TouchableOpacity>
                </View>
                <View className="gap-y-4 ">
                    <Text className="text-lg font-semibold">Link and Docs</Text>
                    <TouchableOpacity onPress={() => { setLinksVisible(true) }}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center">
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Link</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <TouchableOpacity className="bg-teal-500 rounded-full py-4 flex-row items-center gap-x-2 justify-center "
                onPress={handleSubmit}>
                <Text className="text-white text-lg font-semibold">Create Project</Text>
            </TouchableOpacity>

            {memberVisible && (<TeamMemberModal
                visible={memberVisible}
                setVisible={setMemberVisible}
                members={members}
                setMembers={setMembers}
                addMember={addMember}
                removeMember={removeMember} />)}

            {mileStoneVisible && (<MilestoneModal
                visible={mileStoneVisible}
                onClose={() => setMileStoneVisible(false)}
                milestones={milestones}
                setMilestones={setMilestones}
                addMilestone={addMilestone}
                removeMilestone={removeMilestone} />)}

            {fundingVisible && (<FundingInfoModal
                visible={fundingVisible}
                onClose={() => setFundingVisible(false)}
                fundingInfo={fundingInfo}
                setFundingInfo={setFundingInfo}
                addFundingInfo={addFundingInfo}
                removeFundingInfo={removeFundingInfo} />)}

            {linksVisible && (<LinksModal
                visible={linksVisible}
                onClose={() => setLinksVisible(false)}
                links={links}
                setLinks={setLinks}
                addLink={addLink}
                removeLink={removeLink} />)}
        </View>
    )
}