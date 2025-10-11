import { Graduate, User } from "./user";

export enum MilestoneStatus {
    IN_PROGRESS,
    COMPLETED,
}

export enum ProjectCategory {
    EDUCATION,
    AGRICULTURE,
    FINANCE
}

export enum ProjectStatus {
    ACTIVE,
    ARCHIVED
}


export interface FundingInfo{
    goal: number;
    raised: number;
    donors: number;
}

export interface Milestone{
    title: string;
    description: string;
    complationDate: string;
    budget: number;
    status: string;
}

export interface ProjectInteraction{
    likes: number;
    views: number;
    comments: string[];
    shares: number;
}

export interface ProjectLink{
    label: string;
    url: string;
}

export interface Project{
    id: string;
    title: string;
    category: ProjectCategory;
    description: string;
    mission: string;
    vision: string;
    keyFeauture: string;
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