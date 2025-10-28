import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Linking, Share } from 'react-native'
import { router } from 'expo-router'
import { LinkData, ShareableLink, LinksContextType } from '@/types/links'

const LinksContext = createContext<LinksContextType | undefined>(undefined)

interface LinksProviderProps {
    children: ReactNode
}

export function LinksProvider({ children }: LinksProviderProps) {
    const [lastHandledLink, setLastHandledLink] = useState<LinkData | null>(null)
    const [isProcessingLink, setIsProcessingLink] = useState(false)

    // Generate shareable link with both web and deep link versions
    const generateShareLink = (data: LinkData): ShareableLink => {
        const webUrl = generateWebUrl(data)
        const deepLink = generateDeepLink(data)

        return {
            url: webUrl,
            deepLink,
            title: getLinkTitle(data),
            description: getLinkDescription(data)
        }
    }

    // Generate web URL (universal link)
    const generateWebUrl = (data: LinkData): string => {
        const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || 'https://rseeds.app'
        const path = buildPath(data)
        return `${baseUrl}${path}`
    }

    // Generate deep link
    const generateDeepLink = (data: LinkData): string => {
        const scheme = 'r-seeds://'
        const path = buildPath(data)
        return `${scheme}${path.substring(1)}` // Remove leading slash
    }

    // Build path from LinkData
    const buildPath = (data: LinkData): string => {
        let path = data.path

        // Add ID to path if provided
        if (data.id) {
            path = `${path}/${data.id}`
        }

        // Add query parameters if provided
        if (data.params && Object.keys(data.params).length > 0) {
            const queryString = new URLSearchParams(data.params).toString()
            path = `${path}?${queryString}`
        }

        return path
    }

    // Get link title based on type
    const getLinkTitle = (data: LinkData): string => {
        switch (data.type) {
            case 'project':
                return 'Check out this R-Seeds project'
            case 'user':
                return 'Connect with me on R-Seeds'
            case 'chat':
                return 'Join the conversation on R-Seeds'
            default:
                return 'Check this out on R-Seeds'
        }
    }

    // Get link description
    const getLinkDescription = (data: LinkData): string => {
        switch (data.type) {
            case 'project':
                return 'Discover innovative projects and connect with entrepreneurs'
            case 'user':
                return 'Connect and collaborate on R-Seeds platform'
            default:
                return 'Join the R-Seeds community'
        }
    }

    // Parse incoming URL to LinkData
    const parseLink = (url: string): LinkData | null => {
        try {
            const parsedUrl = new URL(url)
            const pathSegments = parsedUrl.pathname.split('/').filter(Boolean)

            if (pathSegments.length < 2) return null

            const [type, action, id] = pathSegments

            // Handle project links
            if (type === 'project' && action === 'spotlight' && id) {
                return {
                    id,
                    type: 'project',
                    path: '/project/spotlight',
                    params: Object.fromEntries(parsedUrl.searchParams)
                }
            }

            // Handle user profile links
            if (type === 'user' && id) {
                return {
                    id,
                    type: 'user',
                    path: '/user/profile',
                    params: Object.fromEntries(parsedUrl.searchParams)
                }
            }

            // Handle chat links
            if (type === 'chat' && id) {
                return {
                    id,
                    type: 'chat',
                    path: '/chat/detail',
                    params: Object.fromEntries(parsedUrl.searchParams)
                }
            }

            return null
        } catch (error) {
            console.error('Error parsing link:', error)
            return null
        }
    }

    // Handle incoming deep link
    const handleIncomingLink = async (url: string): Promise<boolean> => {
        setIsProcessingLink(true)

        try {
            const linkData = parseLink(url)
            if (!linkData) {
                console.warn('Unable to parse link:', url)
                return false
            }
            console.log(url)

            setLastHandledLink(linkData)
            navigateToLink(linkData)
            return true
        } catch (error) {
            console.error('Error handling incoming link:', error)
            return false
        } finally {
            setIsProcessingLink(false)
        }
    }

    // Navigate to link destination
    const navigateToLink = (data: LinkData) => {
        try {
            let route = ''

            switch (data.type) {
                case 'project':
                    route = `/project/detail?id=${data.id}`
                    break
                case 'user':
                    route = `/user/profile?id=${data.id}`
                    break
                case 'chat':
                    route = `/chat/detail?id=${data.id}`
                    break
                default:
                    console.warn('Unknown link type:', data.type)
                    return
            }

            router.push(route as any)
        } catch (error) {
            console.error('Error navigating to link:', error)
        }
    }

    // Share link using native share
    const shareLink = async (data: LinkData, customMessage?: string): Promise<void> => {
        try {
            const shareableLink = generateShareLink(data)
            const message = customMessage || `${shareableLink.title}\n\n${shareableLink.url}`

            await Share.share({
                message,
                url: shareableLink.url, // iOS will use this
                title: shareableLink.title
            })
        } catch (error) {
            console.error('Error sharing link:', error)
            throw error
        }
    }

    // Validate if URL is a valid R-Seeds link
    const isValidLink = (url: string): boolean => {
        try {
            const parsedUrl = new URL(url)
            const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || 'https://rseeds.app'
            const baseHost = new URL(baseUrl).hostname

            // Check if it's our domain or deep link scheme
            return parsedUrl.hostname === baseHost || url.startsWith('r-seeds://')
        } catch {
            return false
        }
    }

    // Listen for deep links when app is opened
    useEffect(() => {
        // Handle initial URL when app is opened from link
        const getInitialUrl = async () => {
            const initialUrl = await Linking.getInitialURL()
            if (initialUrl) {
                handleIncomingLink(initialUrl)
            }
        }

        // Handle URLs when app is already running
        const handleUrl = (event: { url: string }) => {
            handleIncomingLink(event.url)
        }

        getInitialUrl()

        const subscription = Linking.addEventListener('url', handleUrl)

        return () => {
            subscription?.remove()
        }
    }, [handleIncomingLink])

    const value: LinksContextType = {
        generateShareLink,
        generateDeepLink,
        handleIncomingLink,
        parseLink,
        navigateToLink,
        shareLink,
        isValidLink,
        lastHandledLink,
        isProcessingLink
    }

    return (
        <LinksContext.Provider value={value}>
            {children}
        </LinksContext.Provider>
    )
}

export function useLinks(): LinksContextType {
    const context = useContext(LinksContext)
    if (context === undefined) {
        throw new Error('useLinks must be used within a LinksProvider')
    }
    return context
}
