import { Project } from "@/types";
import { router } from "expo-router";
import { TouchableOpacity, Text, Image } from "react-native";
import { useProjects } from "@/contexts/ProjectContext";

export default function ExploreProject({ large, project }: { large: boolean, project: Project }) {
    const{setCurrentProject}=useProjects()
    return (
        <TouchableOpacity className={`relative ${large ? "w-48" : "w-40"} h-full items-center  border-2 border-teal-500 rounded-xl`}
            onPress={() => {setCurrentProject(project);router.push('/project/detail')}}>
            <Image source={{ uri: project.logo }}
                resizeMode="cover"
                className="absolute w-full h-full rounded-xl " />
            <Text className="absolute bottom-0 bg-black/50 p-2 w-full text-center text-white font-semibold  rounded-b-xl ">{project.title}</Text>
        </TouchableOpacity>
    )
}