'use client'

import { RootState } from "@/store/boundStore"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { textDI } from "../../di/text-container.di"
import { setTextsHistory } from "../../text-slice/text-store.slice"
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error"


export const useHistoryTexts=()=>{

    const dispatch = useDispatch()
    const [isPending,setIsPending]=useState(true)
    const[error,setError]=useState('')
    const session = useSelector((state:RootState)=>state.auth.session)
    const textHistory = useSelector((state:RootState)=>state.text.textHistory)
    const id = session?.user.id
    useEffect(()=>{
        if(!id) return
        if (textHistory.length > 0) {
            setIsPending(false)
            return
        }
        const getHistory =async ()=>{
            try {
                setIsPending(true)
                const texts = await textDI.listHistoryTexts(id)
                dispatch(setTextsHistory(texts))
            } catch (err: unknown) {
                if (err instanceof ApiErrorPlatform) {
                    setError(err.message);
                } else {
                    setError('An error has occurred to list history texts');
                }
                setError('An error has occurred to list history texts')
    }       finally{
                setIsPending(false)
            }
        }
        getHistory()
    },[id,textHistory.length,dispatch])

    return {
        isPending,
        textHistory,
        error
    }
}