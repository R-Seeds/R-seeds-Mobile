export interface LinkData {
    id: string
    type: 'project' | 'user' | 'chat' | 'custom'
    path: string
    params?: Record<string, string>
}

export interface ShareableLink {
    url: string
    deepLink: string
    title: string
    description?: string
}

export interface LinksContextType {
    // Generate links
    generateShareLink: (data: LinkData) => ShareableLink
    generateDeepLink: (data: LinkData) => string

    // Handle incoming links
    handleIncomingLink: (url: string) => Promise<boolean>
    parseLink: (url: string) => LinkData | null

    // Navigation
    navigateToLink: (data: LinkData) => void

    // Share functionality
    shareLink: (data: LinkData, customMessage?: string) => Promise<void>

    // Link validation
    isValidLink: (url: string) => boolean

    // State
    lastHandledLink: LinkData | null
    isProcessingLink: boolean
}
