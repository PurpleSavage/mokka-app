
import Link from "next/link";
import { TbActivityHeartbeat } from "react-icons/tb";
export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 flex items-center px-8 py-4 z-40" 
    style={{ 
        backdropFilter: 'blur(8px) saturate(180%)',
        WebkitBackdropFilter:"blur(16px) saturate(180%)",
    }}
    >
        <div className="flex items-center gap-2">
            <TbActivityHeartbeat size={30} color="white"/>
            <p className="text-xl text-white font-bold">Mokka</p>
        </div>
        <div className="grow flex gap-6 items-center justify-end">
            <Link 
                href="/mokka/auth" 
                className="bg-pink-800 hover:bg-white hover:text-black transition-colors  text-white px-8 py-1 rounded-lg font-medium"
            >Log In</Link>
            <Link 
                href="/mokka/auth/create-account" 
                className="text-black hover:text-white bg-white px-8 py-1 rounded-lg font-medium hover:bg-pink-800 transition-colors"
            >Sign up</Link>
        </div>
    </nav>
  )
}
