import { RootState } from "@/store/boundStore"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { imageDI } from "../../di/image-container.di"
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession"
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error"
import { sileo } from "sileo"
import { setImagesLastWeek } from "../../image-slice/image.slice"

export const useLastimages =()=>{
    const [isPending,setIsPending]=useState(true)
    const [ error,setError]=useState('')
    const imagesLastweek = useSelector((state:RootState)=>state.image.imagesLastweek)
    const dispatch = useDispatch()
    const {id}=useIdSession()
    useEffect(()=>{
        if(!id) return
        const getImagesLAstWeek =async()=>{
            try {
                setIsPending(true)
                const lastImages = await imageDI.likstImagesLastWeek(id)
                dispatch(setImagesLastWeek(lastImages))
            } catch (error) {
                if(error instanceof ApiErrorPlatform){
                    setError(error.message)
                    sileo.error({
                        title: error.errorType,
                        description: error.message,
                    })
                }else{
                    setError('An error occurred while listing the images from the last week.')
                    sileo.error({
                        title: "Unexpected Error",
                        description: "There has been an error in last week's image list.",
                });
                }
            }finally{
                setIsPending(false)
            }
        }
        getImagesLAstWeek()
    },[dispatch,id])
    return {
        imagesLastweek,
        error,
        isPending
    }
}