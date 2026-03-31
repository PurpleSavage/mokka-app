'use client'
import ListModels from "./ListModels";
import BackgroundOptions from "./BackgroundOptions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ActiveTapOptionsRender3D = {
    MODELS:'models',
    BACKGROUND:'background',
} as const
type ActiveTapOptionsRender3D= typeof ActiveTapOptionsRender3D[keyof typeof ActiveTapOptionsRender3D]

export default function MenuOptions() {

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
    <div className=" p-4 h-full  flex items-center justify-center">
        <div className="border bg-table-body-bg rounded-lg p-2 space-y-2 border-white/10 h-[80%] overflow-y-auto">
            <div className="p-1 rounded-2xl bg-black">
                <div className="flex items-center">
                    <button 
                            onClick={() => handleTabChange(ActiveTapOptionsRender3D.MODELS)}
                            className={`w-1/2 py-1 rounded-lg transition-all cursor-pointer ${
                                activeTab === ActiveTapOptionsRender3D.MODELS ? 'bg-white/10 text-white' : 'text-gray-400'
                            }`}
                        >
                            Models
                        </button>
                        <button 
                            onClick={() => handleTabChange(ActiveTapOptionsRender3D.BACKGROUND)}
                            className={`w-1/2 py-1 rounded-lg transition-all cursor-pointer ${
                                activeTab === ActiveTapOptionsRender3D.BACKGROUND ? 'bg-white/10 text-white' : 'text-gray-400'
                            }`}
                        >
                            Backgrounds
                        </button>
                </div>
            </div>
            <div className="w-full grid grid-cols-4 gap-2">
                {activeTab === 'models' ? (
                        <ListModels />
                    ) : (
                        <BackgroundOptions />
                    )
                } 
            </div>
        </div>
    </div>
  )
}
