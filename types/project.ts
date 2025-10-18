import { Graduate, User } from "./user";

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

export enum ProjectStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED"
}


export interface FundingInfo {
    goal: number;
    raised: number;
    donors: number;
}

export interface Milestone {
    title: string;
    description: string;
    completionDate: string;
    budget: number;
    status: MilestoneStatus;
}

export interface ProjectInteraction {
    likes: number;
    views: number;
    comments: string[];
    shares: number;
}

export interface ProjectLink {
    label: string;
    url: string;
}

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    description: string;
    mission: string;
    vision: string;
    keyFeature: string;
    status: ProjectStatus;
    owner: User;
    fundingInfo: FundingInfo;
    interaction: ProjectInteraction;
    links: ProjectLink[];
    team: Graduate[];
    milestones: Milestone[];
    createdAt: string;
    updatedAt: string;
}


export type TabProps = 'all' | 'finance' | 'business' | 'education' | 'health' | 'agriculture' | 'transportaion' | 'social' | 'e-commerce' | 'government'
export const Tabs: TabProps[] = ['all', 'finance', 'business', 'education', 'health', 'agriculture', 'transportaion', 'social', 'e-commerce', 'government']