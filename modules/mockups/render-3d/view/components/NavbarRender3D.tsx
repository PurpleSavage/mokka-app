import Link from "next/link";
import ActionsMenu from "./ActionsMenu";
import { SlHome } from "react-icons/sl";
import TooltipComponent from "@/modules/shared/common/view/components/TooltipComponent";
export default function NavbarRender3D() {
  return (
    <div className="border-b border-white/30 py-4 px-10 flex items-center">
        <div className="">
            <p className="text-lg font-bold">3D mockup generator</p>
        </div>
        <div className="grow flex items-center justify-end gap-4">
          <Link 
            href="/mokka/mokka-panel" 
            className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <TooltipComponent text="Go home">
              <SlHome size={18}/>
            </TooltipComponent>
          </Link>
          <ActionsMenu/>
        </div>
    </div>
  )
}
