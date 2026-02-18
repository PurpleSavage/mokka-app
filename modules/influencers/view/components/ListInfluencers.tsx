'use client'
import { FaPlus } from "react-icons/fa6";
import Influencers from "./Influencers";
import CreateInfluencerForm from "./CreateInfluencerForm";
import { useDispatch } from "react-redux";
import { openModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import ModalLookDataWrapper from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";


export default function ListInfluencers() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModalWrapper({ title: "Create a new influencer" }));
  }
  return (
    <section className="border border-slate-500/60
     rounded-lg h-64 p-4 flex items-center gap-4 overflow-x-auto">
      <button 
        type="button"
        onClick={handleOpenModal}
        className="bg-[#121212] hover:bg-zinc-900 border transition-colors flex
       border-slate-600/50 w-52 h-full cursor-pointer hover:text-slate-500
        text-white items-center justify-center"
      >
        <FaPlus size={20}/>
      </button>
      <Influencers/>
      <ModalLookDataWrapper size="max-w-[50%]">
        <CreateInfluencerForm />
      </ModalLookDataWrapper>
    </section>
  )
}
