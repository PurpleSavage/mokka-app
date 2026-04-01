'use client'

import { Html, useProgress } from "@react-three/drei"

export default function ModelLoaderBar() {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-64">
        {/* Texto del porcentaje */}
        <span className="text-white text-xs mb-2 font-mono">
          {progress.toFixed(0)}% CARGANDO MODELO
        </span>
        
        {/* Contenedor de la barra */}
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
          {/* Barra que avanza */}
          <div 
            className="h-full bg-pink-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
    )
}
