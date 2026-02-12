import type { IconType } from "react-icons"
import { LuAudioLines, LuImage, LuText } from "react-icons/lu";
import { TbWorld } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { LiaFileVideoSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiUserFocus } from "react-icons/pi";
interface Option {
    path:string,
    name:string,
    id:string
    icon:IconType
}
export const menuOptions:Option[] =[
    {
        path:'/mokka/mokka-panel/text-generator',
        name:'Text Ai',
        id:'1',
        icon:LuText 
    },
    {
        path:'/mokka/mokka-panel/audio',
        name:'Audio Ai',
        id:'2',
        icon:LuAudioLines 
    },
    {
        path:'/mokka/mokka-panel/image-generator',
        name:'Image generator',
        id:'3',
        icon:LuImage
    },
    {
        path:'/mokka/mokka-panel/social-media',
        name:'Social media',
        id:'4',
        icon:TbWorld 
    },
    {
        path:'/mokka/mokka-panel/send-emails',
        name:'Emails',
        id:'5',
        icon:MdOutlineMail 
    },
    {
        path:'/mokka/mokka-panel/video',
        name:'Video',
        id:'6',
        icon:LiaFileVideoSolid
    },
    {
        path:'/mokka/mokka-panel/influencers',
        name:'Influencers',
        id:'7',
        icon:PiUserFocus
    },
    {
        path:'/mokka/mokka-panel/billing',
        name:'Billing',
        id:'8',
        icon:MdOutlinePayment
    },
    {
        path:'/mokka/mokka-panel/profile',
        name:'Profile',
        id:'9',
        icon:CgProfile
    },
] 