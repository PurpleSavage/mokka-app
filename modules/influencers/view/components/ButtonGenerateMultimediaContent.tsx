'use client'
import { openModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";

import { useDispatch } from "react-redux";
import { OriginComponentOptions, OriginComponentOptionsType } from "../ui-types/multimedia-options";
import { ModalsId } from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";



interface ButtonGenerateMultimediaContentProps{
    text:string,
    originComponent:OriginComponentOptionsType
}
export default function ButtonGenerateMultimediaContent({text,originComponent}:ButtonGenerateMultimediaContentProps) {
    const dispatch = useDispatch()
   const handleOpenModal = () => {
     
        dispatch(openModalWrapper({ 
    title: `${originComponent === OriginComponentOptions.scene ? "Create a new scene" : "Create a new snapshot"}`,
    modalId: ModalsId.INFLUENCER_FORM,  // ← agregar
    formType: originComponent === OriginComponentOptions.scene ? 'SCENE' : 'SNAPSHOT'
}))
    }
  return (
    <div className="flex items-center justify-end py-1">
        <button 
            type="button" 
            className="bg-white hover:bg-pink-800 px-4 py-2 transition-colors
                rounded-md font-medium cursor-pointer
                text-black hover:text-white"
            onClick={handleOpenModal}
        >{text}</button>
        
    </div>
  )
}
