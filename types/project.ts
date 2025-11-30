import { Donation } from "./donation"
import { Graduate, Sponsor, User } from "./user"

export enum MilestoneStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

export enum ProjectCategory {
    EDUCATION,
    AGRICULTURE,
    FINANCE,
    BUSINESS,
    HEALTH,
    SOCIAL,
    TRANSPORTATION,
    ECOMMERCE,
    GOVERNMENT,
}

type DropdownOption<T> = { label: string, value: T }

export enum ProjectStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED"
}

export const ProjectCategoryOptions: DropdownOption<ProjectCategory>[] = [
    { label: "Education", value: ProjectCategory.EDUCATION },
    { label: "Agriculture", value: ProjectCategory.AGRICULTURE },
    { label: "Finance", value: ProjectCategory.FINANCE },
    { label: "Business", value: ProjectCategory.BUSINESS },
    { label: "Health", value: ProjectCategory.HEALTH },
    { label: "Social", value: ProjectCategory.SOCIAL },
    { label: "Transportation", value: ProjectCategory.TRANSPORTATION },
    { label: "E-commerce", value: ProjectCategory.ECOMMERCE },
    { label: "Government", value: ProjectCategory.GOVERNMENT },
]

export const PaymentMethodOptions: DropdownOption<string>[] = [
    { label: "Bank Transfer", value: "Bank Transfer" },
    { label: "Mobile Money", value: "Mobile Money" },
    { label: "Cash", value: "Cash" },
]

export const ProjectStatusOptions: DropdownOption<ProjectStatus>[] = [
    { label: "Active", value: ProjectStatus.ACTIVE },
    { label: "Archived", value: ProjectStatus.ARCHIVED },
]


export interface FundingInfo {
    goal: number
    raised: number
}

export interface Milestone {
    title: string
    description: string
    completionDate: string
    budget: number
    status: MilestoneStatus
}

export interface ProjectInteraction {
    likes: number
    views: number
    comments: string[]
    shares: number
}

export interface ProjectLink {
    label: string
    url: string
}

export interface Project {
    id: string
    title: string
    category: ProjectCategory
    description: string
    mission: string
    vision: string
    logo: string
    keyFeature: string
    status: ProjectStatus
    owner: User
    fundingInfo: FundingInfo
    donations: Donation[]
    interaction: ProjectInteraction
    links: ProjectLink[]
    team: Graduate[]
    milestones: Milestone[]
    createdAt: string
    updatedAt: string
}


export type TabProps = 'all' | 'finance' | 'business' | 'education' | 'health' | 'agriculture' | 'transportaion' | 'social' | 'e-commerce' | 'government'
export const Tabs: TabProps[] = ['all', 'finance', 'business', 'education', 'health', 'agriculture', 'transportaion', 'social', 'e-commerce', 'government']