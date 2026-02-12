
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
export default function ConnectedAccounts() {
  return (
    <div className=" w-5/6 mx-auto space-y-8">
        <div className="space-y-2">
            <p className="text-xl font-bold  text-white">Connected accounts</p>
            <p className="text-base text-gray-400">
                Connect your Instagram or Facebook accounts to use them to log in to Midjourney.
            </p>
        </div>
        <div className="space-y-4">
            <div className="space-y-4 flex items-center gap-4 ">
                <FaInstagram size={25} color="white"/>
                <p className="text-gray-400 text-base grow">Connect your Instagram account so you can post content from Mokka</p>
                <button type="button" className="py-1 rounded-2xl px-8 text-base hover:bg-pink-800 hover:text-white cursor-pointer
                 font-semibold bg-white text-black">connect</button>
            </div>
            <div className="space-y-4 flex items-center gap-4">
                <FaFacebook size={25} color="white"/>
                <p className="text-gray-400 text-base grow">Connect your Facebook account so you can post content from Mokka</p>
                <button type="button" className="py-1 rounded-2xl px-8 text-base hover:bg-pink-800 hover:text-white cursor-pointer
                 font-semibold bg-white text-black">connect</button>
            </div>
        </div>
    </div>
  )
}
