'use client'
import { RootState } from '@/store/boundStore';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { VscMenu } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { IoSaveOutline } from "react-icons/io5";
import { BiScreenshot } from "react-icons/bi";
import { useScreenRecorder } from '@/modules/mockups/shared-mockups/custom-hooks/useScreenRecorder';
import TooltipComponent from '@/modules/shared/common/view/components/TooltipComponent';
import { domRefs } from '@/modules/mockups/shared-mockups/refs-container/dom-refs-container';
export default function ActionsMenu() { 
    const currentDecalUrl = useSelector((state:RootState)=>state.render3D.currentDecalUrl)
    const saveIsActive = currentDecalUrl !== ''

    const {screenRecord}=useScreenRecorder()

    const save = ()=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    const screenShot=()=>{
        const ref = domRefs.getCanvasRef()
        screenRecord(ref)
    }
  return (
    <Popover>
        <PopoverButton 
            className="block 
             text-white/50 
            focus:outline-none data-active:text-white data-focus:outline
             data-focus:outline-white data-hover:text-white cursor-pointer">
            <TooltipComponent text='actions menu'>
                <VscMenu size={18}/>
            </TooltipComponent>
        </PopoverButton>
        <PopoverPanel
            anchor="bottom"
            className="divide-y divide-white/5 rounded-xl border border-white/20
             bg-table-body-bg text-sm/6 transition duration-200
             ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
        >
            <div className="p-3 flex flex-col gap-4">
                <button 
                    type="button" 
                    className="hover:bg-white/10  text-white  transition-colors
                py-2 px-6 rounded-lg text-sm cursor-pointer flex items-center gap-2"
                    onClick={screenShot}
                ><BiScreenshot size={20}/> Screenshot</button>

                <button
                    disabled={saveIsActive} 
                    type="button" 
                    className="hover:bg-white/10  text-white  transition-colors
                py-2 px-6 rounded-lg text-sm cursor-pointer flex items-center gap-2 text-nowrap"
                ><IoSaveOutline size={20}/> Save mockup</button>
            </div>
        </PopoverPanel>
    </Popover>
  )
}
