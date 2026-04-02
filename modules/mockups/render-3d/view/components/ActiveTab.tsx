'use client'

import { ActiveTapOptionsRender3D } from "./Aside3DMenu";
import BackgroundOptions from "./BackgroundOptions";
import EditSection from "./EditSection";
import ListModels from "./ListModels";

interface ActiveTabProps {
    activeTab: string;
}
export default function ActiveTab({ activeTab }: ActiveTabProps) {
    if(activeTab ===ActiveTapOptionsRender3D.MODELS){
        return (
            <div className="border bg-table-body-bg rounded-lg p-2 space-y-2 border-white/10 h-[80%]">
                <p className="text-gray-400">All models</p>
                <div className="grid grid-cols-4 gap-2">
                    <ListModels/>
                </div>
            </div>
        )
    }

    if(activeTab ===ActiveTapOptionsRender3D.BACKGROUND){
        return (
            <div className="space-y-2">
                <p className="text-gray-400">All backgrounds</p>
                <div>
                    <BackgroundOptions/>
                </div>
            </div>
        )
    }

    if(activeTab ===ActiveTapOptionsRender3D.EDIT){
        return (
            <div className="space-y-2">
                <p className="text-gray-400">Edit section</p>
                <div className="grid grid-colos-4">
                    <EditSection/>
                </div>
            </div>
        )
    }

    return null
}
