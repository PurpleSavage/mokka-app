import type { IconType } from "react-icons"
import { LuAudioLines, LuImage, LuLayoutDashboard, LuText } from "react-icons/lu";
import { TbCube, TbWorld } from "react-icons/tb";
import { LiaFileVideoSolid } from "react-icons/lia";
import { PiUserFocus } from "react-icons/pi";
import { IoLayersOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
export interface MenuOption {
  path: string;
  name: string;
  id: string;
  icon: IconType; // O IconType
  allowedRoutes?: string[];
}

export interface MenuSection {
  sectionName: string;
  options: MenuOption[];
}

export const asideSections: MenuSection[] = [
  {
    sectionName: 'Creation',
    options: [
      { id: '1', name: 'Text AI', path: '/mokka/mokka-panel/text-generator', icon: LuText },
      { 
        id: '2', 
        name: 'Audio AI', 
        path: '/mokka/mokka-panel/audio/voices', 
        icon: LuAudioLines,
        allowedRoutes: ['/mokka/mokka-panel/audio']
      },
      { 
        id: '3', 
        name: 'Image AI', 
        path: '/mokka/mokka-panel/images', 
        icon: LuImage,
        allowedRoutes: ['/mokka/mokka-panel/images/gallery']
      },
    ]
  },
  {
    sectionName: 'Product & 3D',
    options: [
      { 
        id: 'mockup-2d', 
        name: 'Mockups 2D', 
        path: '/mokka/mokka-2d', 
        icon: IoLayersOutline
      },
      { 
        id: 'mockup-3d', 
        name: 'Mockups 3D', 
        path: '/mokka/mokka-3d', 
        icon: TbCube 
      },
    ]
  },
  {
    sectionName: 'Distribution',
    options: [
      { id: '6', name: 'Video', path: '/mokka/mokka-panel/video', icon: LiaFileVideoSolid },
      { id: '7', name: 'Influencers', path: '/mokka/mokka-panel/influencers', icon: PiUserFocus },
      { id: '4', name: 'Social Media', path: '/mokka/mokka-panel/social-media', icon: TbWorld },
    ]
  },
  {
    sectionName: 'Final Assembly',
    options: [
      { 
        id: 'editor-global', 
        name: 'Project Editor', 
        path: '/mokka/mokka-panel/editor', 
        icon: LuLayoutDashboard 
      },
    ]
  },
  {
    sectionName: 'Account',
    options: [
        { 
        id: '8', 
        name: 'Billing & Plans', 
        path: '/mokka/mokka-panel/billing', 
        icon: MdOutlinePayment 
        },
        { 
        id: '9', 
        name: 'Profile Settings', 
        path: '/mokka/mokka-panel/profile', 
        icon: CgProfile 
        },
    ]
    }
];