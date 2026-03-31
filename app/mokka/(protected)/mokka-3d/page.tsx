import MenuOptions from "@/modules/mockups/render-3d/view/components/MenuOptions";
import Scene from "@/modules/mockups/render-3d/view/components/Scene";


export default function Mokka3dPage() {
  return (
    <div className="flex-1 grid grid-cols-[25%_70%]">
      <MenuOptions/>
      <Scene/>
    </div>
  )
}
