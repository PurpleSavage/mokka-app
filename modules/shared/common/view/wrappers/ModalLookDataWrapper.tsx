'use client'
import { RootState } from "@/store/boundStore";
import { Fragment, ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux";
import { closeModalWrapper } from "../../common-slice/modals-slice.store";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

interface ModalLookDataWrapperProps{
    children:ReactNode
    size?: string
}
export default function ModalLookDataWrapper({children,size = "max-w-md"}:ModalLookDataWrapperProps) {
    const dispatch = useDispatch()
    const { isVisible, title } = useSelector((state: RootState) => state.modals.modalWrapper)

    const handleClose = () => {
        dispatch(closeModalWrapper());
    }
  return (
    <Transition show={isVisible} as={Fragment}>
      <Dialog as="div" className="relative z-50 focus:outline-none" onClose={handleClose}>
        
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/5 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
             className={`${size} w-full transform overflow-hidden rounded-2xl
              bg-[#121212] p-6 text-left align-middle border
              border-white/10 shadow-2xl transition-all duration-300 
              ease-out data-closed:scale-95 data-closed:opacity-0`}
            >
              {title && (
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {title}
                  </h3>
                  <button 
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="text-slate-300">
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
