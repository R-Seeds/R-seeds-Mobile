import { ApiResponse, CreateDonation,Donation } from "@/types";
import { client } from "./client";
import { API_ENDPOINTS } from "./constants";

class DonationService {
    async donate(data: CreateDonation): Promise<ApiResponse<Donation>> {
        return await client.post<Donation>(API_ENDPOINTS.DONATION.DONATE, data)
    }
}

export const donationService = new DonationService()