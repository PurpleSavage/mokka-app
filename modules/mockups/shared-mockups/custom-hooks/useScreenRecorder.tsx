import { RefObject, useState } from "react"
import html2canvas from "html2canvas"
import { sileo } from "sileo"
export const useScreenRecorder=()=>{
    const [screenShotIsPending,setScreenShotIsPending]=useState(false)

    const trasnformScreenRecordToPngAndDownload=async<T extends HTMLElement>(ref:RefObject<T | null>)=>{
        if (!ref.current) return

         setScreenShotIsPending(true)
        try {
            const canvas = await html2canvas(ref.current)
            const imgData = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = imgData
            link.download = "mokka-screenshot.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error("Error al capturar pantalla:", error)
            sileo.error({
                title:'Screenshot error',
                description:'An error occurred while trying to take a screenshot.'
            })
        } finally {
            setScreenShotIsPending(false) 
        }
    }

    const screenRecord=async(ref:HTMLCanvasElement | null)=>{
        if (!ref) {
            console.error('The reference for the canvas element could not be found.')
            sileo.error({
                title:'Screenshot error',
                description:'An error occurred while trying to take a screenshot.'
            })
            return
        }

        setScreenShotIsPending(true)
        try {
            const image = ref.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = image
            link.download = "mokka-screenshot.png"
            link.click()
        } catch (error) {
            console.error("Error al capturar canvas:", error)
            sileo.error({
                title:'Screenshot error',
                description:'An error occurred while trying to take a screenshot.'
            })
        } finally {
            setScreenShotIsPending(false)
        }
    }
    return{
        trasnformScreenRecordToPngAndDownload,
        screenRecord,
        screenShotIsPending
    }
}