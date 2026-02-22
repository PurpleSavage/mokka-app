
import { useEffect, useState } from "react"
import { commonDI } from "../../di/common-container.di"
import { useDispatch, useSelector } from "react-redux"
import { setCountries } from "../../common-slice/common-slice.slice"
import { RootState } from "@/store/boundStore"

export const useGetCountries=()=>{
    const [isPending,setIsPending]=useState(false)
    const dispatch = useDispatch()
    const listCountries = useSelector((state:RootState)=>state.common.listCountries)
    useEffect(()=>{
        if(listCountries.length>0)return
        const getCountries =async ()=>{
            try {
                setIsPending(true)
                const response=await commonDI.getCountries()
                dispatch(setCountries(response))
            } catch (error) {
                console.error(error)
                dispatch(setCountries([]))
            }finally{
                setIsPending(false)
            }
        }
        getCountries()
    },[dispatch,listCountries.length])
    return {
        isPending,
        listCountries
    }
}