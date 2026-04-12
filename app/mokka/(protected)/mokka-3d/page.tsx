import Aside3DMenu from "@/modules/mockups/render-3d/view/components/Aside3DMenu";
import Scene from "@/modules/mockups/render-3d/view/components/Scene";


export default function Mokka3dPage() {
  return (
    <div className="flex-1 min-h-0 grid grid-cols-[450px_1fr]">
      <Aside3DMenu/>
      <Scene/> 
    </div>
  )
}
