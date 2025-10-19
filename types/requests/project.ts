import { ProjectCategory, ProjectStatus, ProjectLink, Milestone, FundingInfo } from "../project";
import { Graduate } from "../user";


export interface ProjectCreateRequest {
    title: string;
    category: ProjectCategory;
    description: string;
    mission: string;
    vision: string;
    keyFeature: string;
    status: ProjectStatus;
    fundingInfo: FundingInfo;
    links: ProjectLink[];
    team: Graduate[];
    milestones: Milestone[];
    logo: string
}

export interface ProjectUpdateRequest {
    title: string;
    category: ProjectCategory;
    description: string;
    mission: string;
    vision: string;
    keyFeature: string;
    status: ProjectStatus;
    fundingInfo: FundingInfo;
    links: ProjectLink[];
    team: Graduate[];
    milestones: Milestone[];
    logo: string
}