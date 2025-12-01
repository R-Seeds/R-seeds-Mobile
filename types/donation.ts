import { Project } from "./project"
import { Sponsor } from "./user"

export interface Donation {
    id: string
    project: Project
    donor: Sponsor
    amount: number
    paymentMethod: string
    createdAt: string
    updatedAt: string
}