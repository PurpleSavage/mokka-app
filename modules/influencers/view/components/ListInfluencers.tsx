'use client'
import { FaPlus } from "react-icons/fa6";
import Influencers from "./Influencers";
import { useDispatch } from "react-redux";
import { openModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import { ModalsId } from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";



export default function ListInfluencers() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
  
    dispatch(openModalWrapper({ title: 'Crear', modalId:ModalsId.INFLUENCER_FORM, formType: 'INFLUENCER'}))
     
  }
  return (
    <section className="border border-slate-500/60
     rounded-lg h-40 p-4 flex items-center gap-4 overflow-x-auto">
      <button 
        type="button"
        onClick={handleOpenModal}
        className="bg-table-body-bg hover:bg-zinc-900 border transition-colors flex
       border-slate-600/50 w-30 h-full cursor-pointer hover:text-slate-500
        text-white items-center justify-center"
      >
        <FaPlus size={20}/>
      </button>
      <Influencers styleSkeleton="w-30 h-full"/>
    </section>
  )
}
