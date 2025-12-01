import { ApiResponse, CreateDonation,Donation, DonorProject } from "@/types";
import { client } from "./client";
import { API_ENDPOINTS } from "./constants";

class DonationService {
    async donate(data: CreateDonation): Promise<ApiResponse<DonorProject>> {
        return await client.post<DonorProject>(API_ENDPOINTS.DONATION.DONATE, data)
    }
}

export const donationService = new DonationService()