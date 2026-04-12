'use client'

import dynamic from 'next/dynamic';

const Render3D = dynamic(() => import('./Render'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-neutral-900 text-white">
      <p className="animate-pulse">Starting 3D engine...</p>
    </div>
  )
});

export default function Scene() {
  return (
    <div className="h-full w-full">
        <Render3D />
    </div>
  )
}
