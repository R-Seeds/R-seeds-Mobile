import { ProjectCategory, ProjectStatus, ProjectInteraction, ProjectLink, Milestone, FundingInfo } from "../project";
import { Graduate } from "../user";


export interface ProjectCreateRequest {
    title: string;
    category: ProjectCategory;
    description: string;
    mission: string;
    vision: string;
    keyFeauture: string;
    status: ProjectStatus;
    fundingInfo: FundingInfo;
    interaction: ProjectInteraction;
    links: ProjectLink[];
    team: Graduate[];
    milestones: Milestone[];
}