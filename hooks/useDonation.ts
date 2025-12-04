import { useProjects } from "@/contexts/ProjectContext"
import { useToast } from "@/contexts/ToastContext"
import { useUser } from "@/contexts/UserContext"
import { donationService } from "@/services"
import { CreateDonation } from "@/types"

export function useDonation() {
    const { showToast } = useToast()
    const { updateSponsor } = useUser()
    const { updateDonorProject } = useProjects()
    const donate = async (data: CreateDonation) => {
        try {
            const response = await donationService.donate(data)
            if (response.success) {
                showToast({
                    type: 'success',
                    title: 'Donated Successfully',
                    message: 'You have donated successfully!'
                })
                updateDonorProject(response.data)
                updateSponsor(data.amount)
            }
        } catch {
            showToast({
                type: 'error',
                title: 'Donation Failed',
                message: 'Something went wrong! Please try again later.'
            })
        }
    }

    return {
        donate
    }
}