import { Project } from "@/types"
import { Share } from "react-native"

// Legacy functions - consider using useLinks hook instead
export function getSharePath(data: Project) {
	return `/project/detail?id=${data.id}`
}

export function getShareUrl(data: Project) {
	const path = getSharePath(data)
	const url = new URL(path, process.env.EXPO_PUBLIC_BASE_URL)
	return url.toString()
}

export async function share(data: Project) {
	return await Share.share({ message: getShareUrl(data) })
}

// Helper to convert Project to LinkData format - simplified to /project/id
export function projectToLinkData(project: Project) {
	return {
		id: project.id,
		type: 'project' as const,
		path: '/project/details'
	}
}