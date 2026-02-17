import type { IconType } from "react-icons"
import { LuAudioLines, LuImage, LuText } from "react-icons/lu";
import { TbWorld } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { LiaFileVideoSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiUserFocus } from "react-icons/pi";
export interface Option {
    path:string,
    name:string,
    id:string,
    icon:IconType,
    allowedRoutes?:string[]
}
export const menuOptions:Option[] =[
    {
        path:'/mokka/mokka-panel/text-generator',
        name:'Text Ai',
        id:'1',
        icon:LuText,
    },
    {
        path:'/mokka/mokka-panel/audio',
        name:'Audio Ai',
        id:'2',
        icon:LuAudioLines,
        allowedRoutes:[
            '/mokka/mokka-panel/audio',
            '/mokka/mokka-panel/audio/music'
        ]
    },
    {
        path:'/mokka/mokka-panel/images',
        name:'Image generator',
        id:'3',
        icon:LuImage,
        allowedRoutes:[]
    },
    {
        path:'/mokka/mokka-panel/social-media',
        name:'Social media',
        id:'4',
        icon:TbWorld,
        allowedRoutes:[]
    },
    {
        path:'/mokka/mokka-panel/send-emails',
        name:'Emails',
        id:'5',
        icon:MdOutlineMail,
        allowedRoutes:[]
    },
    {
        path:'/mokka/mokka-panel/video',
        name:'Video',
        id:'6',
        icon:LiaFileVideoSolid,
        allowedRoutes:[]
    },
    {
        path:'/mokka/mokka-panel/influencers',
        name:'Influencers',
        id:'7',
        icon:PiUserFocus,
        allowedRoutes:[]
    },
    {
        path:'/mokka/mokka-panel/billing',
        name:'Billing',
        id:'8',
        icon:MdOutlinePayment,
        allowedRoutes:[]
    },
    {
        path:'/mokka/mokka-panel/profile',
        name:'Profile',
        id:'9',
        icon:CgProfile,
        allowedRoutes:[]
    },
] 


