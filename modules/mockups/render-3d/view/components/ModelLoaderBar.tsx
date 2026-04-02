'use client'

import { useProgress } from "@react-three/drei"

export default function ModelLoaderBar() {
  const { active, progress } = useProgress()
  if (!active) return null
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="flex flex-col items-center w-64">
        <span className="text-white text-xs mb-2 font-mono">
          {progress.toFixed(0)}% CARGANDO MODELO
        </span>
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-pink-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
    )
}
