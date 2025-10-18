import FundingInfoModal from "@/components/project/modals/fundingInfoModal";
import LinksModal from "@/components/project/modals/linksModal";
import TeamMemberModal from "@/components/project/modals/memberModal";
import MilestoneModal from "@/components/project/modals/milestoneModal";
import Input from "@/components/ui/Input";
import InputArea from "@/components/ui/InputArea";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

export default function CreateProjectScreen() {
    const [memberVisible, setMemberVisible] = useState(false);
    const [mileStoneVisible, setMileStoneVisible] = useState(false);
    const [fundingVisible, setFundingVisible] = useState(false);
    const [linksVisible, setLinksVisible] = useState(false);

    const [members, setMembers] = useState([{ graduate: "", role: "" }]);
    const [fundingInfo, setFundingInfo] = useState([
        { title: "", description: "", status: "", budget: "", date: "" },
    ]);
    const [links, setLinks] = useState([
        { title: "", url: "" },
    ]);

    const addMember = () =>
        setMembers([...members, { graduate: "", role: "" }]);

    const removeMember = (index: number) =>
        setMembers(members.filter((_, i) => i !== index));

    const [milestones, setMilestones] = useState([
        { title: "", description: "", status: "", budget: "", date: "" },
    ]);

    const addMilestone = () =>
        setMilestones([
            ...milestones,
            { title: "", description: "", status: "", budget: "", date: "" },
        ]);

    const removeMilestone = (index: number) =>
        setMilestones(milestones.filter((_, i) => i !== index));

    const addFundingInfo = () =>
        setFundingInfo([
            ...fundingInfo,
            { title: "", description: "", status: "", budget: "", date: "" },
        ]);

    const removeFundingInfo = (index: number) =>
        setFundingInfo(fundingInfo.filter((_, i) => i !== index));

    const addLink = () =>
        setLinks([
            ...links,
            { title: "", url: "" },
        ]);

    const removeLink = (index: number) =>
        setLinks(links.filter((_, i) => i !== index));

    return (
        <View className="flex-1 p-4 pb-10">
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
                <Input />
                <Input />
                <InputArea />
                <InputArea />
                <InputArea />
                <InputArea />
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
            <TouchableOpacity className="bg-teal-500 rounded-full py-4 flex-row items-center gap-x-2 justify-center ">
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