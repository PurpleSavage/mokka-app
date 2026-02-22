'use client'
import { openModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import ModalLookDataWrapper from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";
import { useDispatch } from "react-redux";
import GenerateSceneForm from "./GenerateSceneForm";
import GenerateSnapshotForm from "./GenerateSnapshotForm";

export const OriginComponentOptions = {
    snapshot:'SNAPSHOT',
    scene:'SCENE'
} as const

export type OriginComponentOptionsType = typeof OriginComponentOptions[keyof typeof OriginComponentOptions]

interface ButtonGenerateMultimediaContentProps{
    text:string,
    originComponent:OriginComponentOptionsType
}
export default function ButtonGenerateMultimediaContent({text,originComponent}:ButtonGenerateMultimediaContentProps) {
    const dispatch = useDispatch()
   const handleOpenModal = () => {
        dispatch(openModalWrapper({ 
            title: `${originComponent===OriginComponentOptions.scene?
                 "Create a new scene":"Create a new snapshot"}`}
        ))
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
        <ModalLookDataWrapper size="max-w-[50%]">
            {
                originComponent === OriginComponentOptions.scene ? 
                <GenerateSceneForm/> : <GenerateSnapshotForm/>
            }
        </ModalLookDataWrapper>
    </div>
  )
}
