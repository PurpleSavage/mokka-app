'use client'
import { commonDI } from "@/modules/shared/common/di/common-container.di";
import { FaCloudDownloadAlt } from "react-icons/fa";
export interface DownloadImageButtonProps{
    imageUrl:string
}
export default function DownloadImageButton({imageUrl}:DownloadImageButtonProps) {
    const downloadImage =async()=>{
        try {
            const blob = await commonDI.downloadfile( imageUrl)

            const blobUrl = URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${crypto.randomUUID()}-mokka-image.jpg`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
        console.error("Error descargando la imagen:", error);
        }
    }
  return (
    <button 
        type="button" 
        className="w-1/2 py-3 flex items-center gap-2 cursor-pointer font-medium
        justify-center bg-black text-white hover:text-pink-800 rounded-2xl"
        onClick={downloadImage}
    ><FaCloudDownloadAlt size={20}/> Download</button>
  )
}
