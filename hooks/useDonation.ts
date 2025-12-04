import { useProjects } from "@/contexts/ProjectContext"
import { useToast } from "@/contexts/ToastContext"
import { useUser } from "@/contexts/UserContext"
import { donationService } from "@/services"
import { CreateDonation } from "@/types"
import { useState } from "react"

export function useDonation() {
    const [loading, setLoading] = useState(false)
    const { showToast } = useToast()
    const { updateSponsor } = useUser()
    const { updateDonorProject } = useProjects()
    const donate = async (data: CreateDonation) => {
        try {
            setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    return {
        donate,
        loading
    }
}