import { RootState } from "@/store/boundStore"
import { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { influencerProfileDI } from "../../di/influencer-profile-container.di"
import { setInfoCurrentInfluencer } from "../../influencer-slice/influencer-profile.slice"
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error"

export const useInfluencerInfo = (id: string) => {
    const [error,setError]=useState('')
    const influencerSelected = useSelector(
        (state: RootState) => state.influencerProfile.influencerSelected,
        shallowEqual
    )
    const selectedId = useSelector(
        (state: RootState) => state.influencerProfile.influencerSelected?.id
    )
    const [isPending, setIsPending] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (selectedId === id) return

        const getInfluencer = async() => {
            setIsPending(true)
            try {
                const responseProfil = await influencerProfileDI.getInfluencerProfile(id)
                dispatch(setInfoCurrentInfluencer(responseProfil))
            } catch (error) {
                if (ApiErrorPlatform.isUnauthorized(error)) return
                if (error instanceof ApiErrorPlatform){
                    setError(error.message)
                }else{
                    setError('An error occurred while retrieving the information.')
                }
            } finally {
                setIsPending(false)
            }
        }
        getInfluencer()
    }, [id, selectedId,dispatch])

    return {
        influencer: influencerSelected,
        isPending,
        error
    }
}