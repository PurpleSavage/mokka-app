'use client'
import { DateFormatter} from "@/modules/shared/common/view/utils/date-formatter.util"
import { RootState } from "@/store/boundStore"
import { useSelector } from "react-redux"

export default function InfoUser() {
    const session = useSelector((state:RootState)=>state.auth.session)
  return (
    <div className=" w-5/6 mx-auto space-y-8">
        <p className="text-xl font-bold  text-white">Account details</p>
        <div className="space-y-4">
            <div className="py-4 border-b border-white/20 flex items-center">
                <p className="text-white grow">user id</p>
                <p className="text-white">{session?.user.id}</p>
            </div>
            <div className="py-4 border-b border-white/20 flex items-center">
                <p className="text-white grow">Credits</p>
                <p className="text-green-600" >{session?.user.credits}</p>
            </div>
            <div className="py-4 border-b border-white/20 flex items-center">
                <p className="text-white grow">email</p>
                <p className="text-white">{session?.user.email}</p>   
            </div>

            <div className="py-4 border-b border-white/20 flex items-center">
                {session? 
                    <p className="text-white text-end w-full">This account was created{' '} 
                        <span className="text-pink-800">{DateFormatter.formatLong(session.user.createDate)}</span>
                    </p>
                    : null
                }
            </div>
        </div>
    </div>
  )
}
