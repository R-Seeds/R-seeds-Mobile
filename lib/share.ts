import { Share } from "react-native"

// Legacy functions - consider using useLinks hook instead
export function getSharePath(data: string) {
	return `/project/detail?id=${data}`
}

export function getShareUrl(data:string) {
	const path = getSharePath(data)
	const url = new URL(path, process.env.EXPO_PUBLIC_BASE_URL)
	return url.toString()
}

export async function share(data: string) {
	return await Share.share({ message: getShareUrl(data) })
}

// Helper to convert Project to LinkData format - simplified to /project/id
export function projectToLinkData(id:string) {
	return {
		id: id,
		type: 'project' as const,
		path: '/project/details'
	}
}