import { RootState } from "@/store/boundStore"
import { useEffect, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"

export const useInfluencerInfo = (id: string) => {
    const influencerSelected = useSelector(
        (state: RootState) => state.influencers.influencerSelected,
        shallowEqual
    )
    const selectedId = useSelector(
        (state: RootState) => state.influencers.influencerSelected?.id
    )
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        if (selectedId === id) return

        const getInfluencer = () => {
            setIsPending(true)
            try {
                console.log('fetch')
            } catch (error) {
                console.log(error)
            } finally {
                setIsPending(false)
            }
        }
        getInfluencer()
    }, [id, selectedId])

    return {
        influencer: influencerSelected,
        isPending
    }
}