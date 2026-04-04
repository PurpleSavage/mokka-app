import Link from "next/link";
import SaveModel from "./SaveModel";

export default function NavbarRender3D() {
  return (
    <div className="border-b border-white/30 py-4 px-4 flex items-center">
        <div className="">
            <p className="text-lg font-bold">3D mockup generator</p>
        </div>
        <div className="grow flex items-center justify-end gap-4">
          <Link 
            href="/mokka/mokka-panel" 
            className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
          >Go home</Link>
          <button 
            type="button" 
            className="bg-pink-800 text-white hover:bg-pink-700 transition-colors
           py-2 px-6 rounded-lg text-sm cursor-pointer"
          >Export mockup</button>
          <SaveModel/>
        </div>
    </div>
  )
}
