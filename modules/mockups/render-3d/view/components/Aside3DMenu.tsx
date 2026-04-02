'use client'
import { TbCube3dSphere } from "react-icons/tb";
import { PiSelectionBackground } from "react-icons/pi";
import { PiSticker } from "react-icons/pi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ActiveTab from "./ActiveTab";


export const ActiveTapOptionsRender3D = {
    MODELS:'models',
    BACKGROUND:'background',
    EDIT:'edit'
} as const
type ActiveTapOptionsRender3D= typeof ActiveTapOptionsRender3D[keyof typeof ActiveTapOptionsRender3D]
export default function Aside3DMenu() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeTab = (searchParams.get('tab') as ActiveTapOptionsRender3D) || ActiveTapOptionsRender3D.MODELS

    useEffect(() => {
        if (!searchParams.get('tab')) {
            const params = new URLSearchParams(searchParams.toString())
            params.set('tab', ActiveTapOptionsRender3D.MODELS)
            router.replace(`?${params.toString()}`, { scroll: false })
        }
    }, [router, searchParams])
        
    const handleTabChange = (tab: ActiveTapOptionsRender3D) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', tab)
        router.push(`?${params.toString()}`, { scroll: false })
    };
  return (
    <aside className=" h-full  grid grid-cols-[20%_80%]  pr-2">
        <div className="flex items-center justify-center h-full">
            <nav className="border bg-table-body-bg rounded-lg flex flex-col items-center
             justify-center gap-4  space-y-2 border-white/10 h-[80%] p-2">
                <button onClick={() => handleTabChange(ActiveTapOptionsRender3D.MODELS)}
                            className={`p-4 flex items-center justify-center rounded-lg  transition-all cursor-pointer ${
                                activeTab === ActiveTapOptionsRender3D.MODELS ? 'bg-white/10 text-white' : 'text-gray-400'
                            }`}>
                    <TbCube3dSphere />
                </button>
                <button onClick={() => handleTabChange(ActiveTapOptionsRender3D.BACKGROUND)}
                            className={`p-4  rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                                activeTab === ActiveTapOptionsRender3D.BACKGROUND ? 'bg-white/10 text-white' : 'text-gray-400'
                            }`}>
                    <PiSelectionBackground />
                </button>
                <button onClick={() => handleTabChange(ActiveTapOptionsRender3D.EDIT)}
                            className={`p-4  rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                                activeTab === ActiveTapOptionsRender3D.EDIT ? 'bg-white/10 text-white' : 'text-gray-400'
                            }`}>
                    <PiSticker />
                </button>
            </nav>
        </div>
        <div className="flex items-center justify-center h-full">
            <ActiveTab activeTab={activeTab}/>
        </div>
    </aside>
  )
}
