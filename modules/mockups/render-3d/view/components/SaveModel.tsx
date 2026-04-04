'use client'

import { RootState } from "@/store/boundStore"
import { useSelector } from "react-redux"

export default function SaveModel() {
    const currentDecalUrl = useSelector((state:RootState)=>state.render3D.currentDecalUrl)
    const saveIsActive = currentDecalUrl !== ''

    const save = ()=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button
            disabled={saveIsActive} 
            type="button" 
            className={`${saveIsActive ? "":""}`}
        >Save mockup</button>
    )
}
