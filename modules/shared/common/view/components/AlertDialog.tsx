'use client'
import { RootState } from '@/store/boundStore';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { IoAlertCircle, IoCheckmarkCircle, IoInformationCircle, IoWarning } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../../common-slice/modals-slice.store';




export default function AlertDialog() {
    const config = useSelector((state:RootState)=>state.modals.alert)
    const dispatch=useDispatch()

  const icons = {
    error: <IoAlertCircle className="text-red-500" size={24} />,
    success: <IoCheckmarkCircle className="text-green-500" size={24} />,
    warning: <IoWarning className="text-yellow-500" size={24} />,
    info: <IoInformationCircle className="text-blue-500" size={24} />,
  };
  const onClose =()=>{
    dispatch(closeAlert())
  }
  return (
    <Dialog open={config.isVisible} as="div" className="relative z-50 focus:outline-none" onClose={onClose}>

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition // <--- Esta es la magia de la v2.0 que viste en la doc
            className="w-full max-w-md rounded-xl bg-slate-900 border border-slate-800 p-6 backdrop-blur-2xl duration-300 ease-out
             data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="flex items-center gap-3">
               {icons[config.type]}
               <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                {config.title}
              </DialogTitle>
            </div>
            
            <p className="mt-2 text-sm/6 text-white/50">
              {config.message}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                className="text-sm text-slate-400 hover:text-white"
                onClick={onClose}
              >
                Cancel
              </Button>
             
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}