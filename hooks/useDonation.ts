import { useProjects } from "@/contexts/ProjectContext"
import { useToast } from "@/contexts/ToastContext"
import { donationService } from "@/services"
import { CreateDonation } from "@/types"

export function useDonation() {
    const { updateDonorProject } = useProjects()
    const { showToast } = useToast()
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
            }
        } catch (error) {
            console.error(error)
        }
    }

    return {
        donate
    }
}