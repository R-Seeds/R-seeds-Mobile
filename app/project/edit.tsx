import FundingInfoModal from "@/components/project/modals/fundingInfoModal";
import LinksModal from "@/components/project/modals/linksModal";
import TeamMemberModal from "@/components/project/modals/memberModal";
import MilestoneModal from "@/components/project/modals/milestoneModal";
import Input from "@/components/ui/Input";
import InputArea from "@/components/ui/InputArea";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ScrollView, ActivityIndicator } from "react-native";
import { FundingInfo, Graduate, Milestone, Project, ProjectCategory, ProjectCreateRequest, ProjectLink, ProjectStatus, ProjectCategoryOptions } from "@/types";
import DropdownInput from "@/components/ui/DropDownInput";
import useProjectAction from "@/hooks/useProjectAction";
import { useProjects } from "@/contexts/ProjectContext";

export default function EditProjectScreen() {

    const { updateProject,loading } = useProjectAction();
    const { currentProject } = useProjects()

    const [projectData, setProjectData] = useState<Project | null>(null);
    const [loadingProject, setLoadingProject] = useState(true);

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
    const [milestones, setMilestones] = useState<Milestone[]>([]);

    // Load project data
    useEffect(() => {
        function loadProject() {

            setProjectData(currentProject);
            populateForm(currentProject!);
            setLoadingProject(false);
        }
        loadProject();
    }, [ currentProject]);

    const populateForm = (project: Project) => {
        setTitle(project.title);
        setCategory(project.category);
        setDescription(project.description);
        setMission(project.mission);
        setVision(project.vision);
        setKeyFeature(project.keyFeature);
        setMembers(project.team || []);
        setFundingInfo(project.fundingInfo);
        setLinks(project.links || []);
        setMilestones(project.milestones || []);
    };

    const addMember = (graduate: Graduate) =>
        setMembers([...members, graduate]);

    const removeMember = (index: number) =>
        setMembers(members.filter((_, i) => i !== index));

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

    const handleSubmit = async () => {
        if (!title || !category || !description || !mission || !vision || !keyFeature || !fundingInfo) {
            return;
        }

        const projectUpdateData: ProjectCreateRequest = {
            title,
            status: projectData?.status || ProjectStatus.ACTIVE,
            category,
            description,
            mission,
            vision,
            keyFeature,
            team: members,
            milestones,
            fundingInfo,
            links
        };

        await updateProject(currentProject!.id, projectUpdateData);
    };

    if (loadingProject) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#14b8a6" />
                <Text className="mt-4 text-gray-600">Loading project...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 p-4 pb-10">
            <View className="flex-row items-center gap-x-14 pt-4">
                <TouchableOpacity
                    className="bg-gray-500/80 rounded-full z-10 p-2 w-12 h-12"
                    onPress={() => router.back()}
                >
                    <FontAwesome5 name="chevron-left" size={24} color="white" className="text-center" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-teal-500">Edit Project</Text>
            </View>

            <ScrollView contentContainerClassName="pt-10 pb-20 gap-y-4" showsVerticalScrollIndicator={false}>
                <Input label="Project Title" value={title} setValue={setTitle} />
                <DropdownInput
                    label="Category"
                    placeholder="Select a category"
                    value={category}
                    options={ProjectCategoryOptions}
                    onChange={setCategory}
                />
                <InputArea label="Description" value={description} setValue={setDescription} />
                <InputArea label="Mission" value={mission} setValue={setMission} />
                <InputArea label="Vision" value={vision} setValue={setVision} />
                <InputArea label="Key Features" value={keyFeature} setValue={setKeyFeature} />

                {/* Team Members Section */}
                <View className="gap-y-4">
                    <Text className="text-lg font-semibold">Team ({members.length})</Text>
                    {members.map((member, index) => (
                        <View key={index} className="bg-gray-50 p-4 rounded-lg flex-row items-center justify-between">
                            <View className="flex-1">
                                <Text className="font-semibold text-gray-900">{member.user.name}</Text>
                                <Text className="text-teal-600 text-sm">Team Member</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => removeMember(index)}
                                className="bg-red-500 p-2 rounded-full"
                            >
                                <AntDesign name="delete" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity
                        onPress={() => setMemberVisible(true)}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center"
                    >
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Member</Text>
                    </TouchableOpacity>
                </View>

                {/* Project Milestones Section */}
                <View className="gap-y-4">
                    <Text className="text-lg font-semibold">Project Milestones ({milestones.length})</Text>
                    {milestones.map((milestone, index) => (
                        <View key={index} className="bg-gray-50 p-4 rounded-lg flex-row items-center justify-between">
                            <View className="flex-1">
                                <Text className="font-semibold text-gray-900">{milestone.title}</Text>
                                <Text className="text-gray-600 text-sm">{milestone.description}</Text>
                                <Text className="text-teal-600 text-xs mt-1">
                                    {milestone.status === 'COMPLETED' ? '✅ Completed' : '⏳ In Progress'}
                                </Text>
                            </View>
                            <View className="flex-row gap-x-2">
                                <TouchableOpacity
                                    onPress={() => {
                                        // Edit milestone logic would go here
                                        console.log('Edit milestone', index);
                                    }}
                                    className="bg-blue-500 p-2 rounded-full"
                                >
                                    <AntDesign name="edit" size={16} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => removeMilestone(index)}
                                    className="bg-red-500 p-2 rounded-full"
                                >
                                    <AntDesign name="delete" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity
                        onPress={() => setMileStoneVisible(true)}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center"
                    >
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Milestone</Text>
                    </TouchableOpacity>
                </View>

                {/* Funding Info Section */}
                <View className="gap-y-4">
                    <Text className="text-lg font-semibold">Funding Info</Text>
                    {fundingInfo ? (
                        <View className="bg-gray-50 p-4 rounded-lg">
                            <Text className="font-semibold text-gray-900">Target: ${fundingInfo.goal}</Text>
                            <Text className="text-gray-600">Current: ${fundingInfo.raised}</Text>
                            <Text className="text-gray-600">Donors: {fundingInfo.donors}</Text>
                            <TouchableOpacity
                                onPress={removeFundingInfo}
                                className="bg-red-500 p-2 rounded-lg mt-2 items-center"
                            >
                                <Text className="text-white font-semibold">Remove Funding Info</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() => setFundingVisible(true)}
                            className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center"
                        >
                            <Ionicons name="add" size={24} color="white" />
                            <Text className="text-white font-semibold">Add Funding</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Links Section */}
                <View className="gap-y-4">
                    <Text className="text-lg font-semibold">Links & Docs ({links.length})</Text>
                    {links.map((link, index) => (
                        <View key={index} className="bg-gray-50 p-4 rounded-lg flex-row items-center justify-between">
                            <View className="flex-1">
                                <Text className="font-semibold text-gray-900">{link.label}</Text>
                                <Text className="text-blue-600 text-sm">{link.url}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => removeLink(index)}
                                className="bg-red-500 p-2 rounded-full"
                            >
                                <AntDesign name="delete" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity
                        onPress={() => setLinksVisible(true)}
                        className="bg-teal-500 rounded-lg p-2 flex-row items-center gap-x-2 justify-center"
                    >
                        <Ionicons name="add" size={24} color="white" />
                        <Text className="text-white font-semibold">Add Link</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity
                className="bg-teal-500 rounded-full py-4 flex-row items-center gap-x-2 justify-center"
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text className="text-white text-lg font-semibold">Save Changes</Text>
                )}
            </TouchableOpacity>

            {/* Modals */}
            {memberVisible && (
                <TeamMemberModal
                    visible={memberVisible}
                    setVisible={setMemberVisible}
                    members={members}
                    setMembers={setMembers}
                    addMember={addMember}
                    removeMember={removeMember}
                />
            )}

            {mileStoneVisible && (
                <MilestoneModal
                    visible={mileStoneVisible}
                    onClose={() => setMileStoneVisible(false)}
                    milestones={milestones}
                    setMilestones={setMilestones}
                    addMilestone={addMilestone}
                    removeMilestone={removeMilestone}
                />
            )}

            {fundingVisible && (
                <FundingInfoModal
                    visible={fundingVisible}
                    onClose={() => setFundingVisible(false)}
                    fundingInfo={fundingInfo}
                    setFundingInfo={setFundingInfo}
                    addFundingInfo={addFundingInfo}
                    removeFundingInfo={removeFundingInfo}
                />
            )}

            {linksVisible && (
                <LinksModal
                    visible={linksVisible}
                    onClose={() => setLinksVisible(false)}
                    links={links}
                    setLinks={setLinks}
                    addLink={addLink}
                    removeLink={removeLink}
                />
            )}
        </View>
    );
}
