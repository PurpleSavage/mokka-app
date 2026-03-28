"use client";
import { RootState } from "@/store/boundStore";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { CiHome } from "react-icons/ci";
import { RiUserCommunityLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { TbActivityHeartbeat } from "react-icons/tb";
import NotificationBadge from "../../../notifications/view/components/NotificationBadge";
import { asideSections, MenuOption } from "../constants/menu-options";
import { MdOutlinePayment } from "react-icons/md";
function Aside() {
  const session = useSelector((state: RootState) => state.auth.session);
  const pathname = usePathname();

  const getFirstLetter = (name: string) => name ? name[0].toUpperCase() : "U";

  // Estilos centralizados
  const activeStyles = "bg-white/10 text-white border-l-2 border-white/50";
  const inactiveStyles = "text-slate-400 hover:bg-white/5 hover:text-white";
  const baseStyles = "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200";

  const checkActive = (option: MenuOption) => {
    if (pathname === option.path) return true;
    return option.allowedRoutes?.some(route => pathname.startsWith(route)) ?? false;
  }

  return (
    <aside className="w-64 sticky left-0 top-0 flex flex-col h-screen border-r border-white/10 bg-[#0a0a0a]">
      {/* Brand Logo */}
      <div className="px-6 py-6 flex items-center gap-2">
        <TbActivityHeartbeat size={28} className="text-white" />
        <span className="text-white font-bold text-2xl tracking-tight">Mokka</span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6 px-4">
        
        {/* Navigation Home/Community */}
        <nav className="space-y-1">
          <Link href="/mokka/mokka-panel" className={`${baseStyles} ${pathname === '/mokka/mokka-panel' ? activeStyles : inactiveStyles}`}>
            <CiHome size={20} /> Home
          </Link>
          <Link href="/mokka/mokka-panel/community" className={`${baseStyles} ${pathname.startsWith('/mokka/mokka-panel/community') ? activeStyles : inactiveStyles}`}>
            <RiUserCommunityLine size={20} /> Community
          </Link>
          <NotificationBadge baseStyles={baseStyles} activeStyles={activeStyles} inactiveStyles={inactiveStyles} isActive={(p) => pathname === p} />
        </nav>

        {/* Dynamic Sections */}
        {asideSections.map((section) => (
          <div key={section.sectionName} className="flex flex-col gap-2">
            <h3 className="px-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              {section.sectionName}
            </h3>
            <ul className="space-y-1">
              {section.options.map((option) => (
                <li key={option.id}>
                  <Link
                    href={option.path}
                    className={`${baseStyles} ${checkActive(option) ? activeStyles : inactiveStyles}`}
                  >
                    <option.icon size={18} />
                    {option.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Profile */}
      <div className="mt-auto border-t border-white/10 p-4 bg-[#0d0d0d]">
        <div className="flex items-center gap-3 p-2 rounded-xl border border-white/5 bg-white/2">
          <div className="size-9 shrink-0 flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
            <span className="text-white text-xs font-bold">
              {session ? getFirstLetter(session.user.email) : "U"}
            </span>
          </div>
          <div className="grow overflow-hidden">
            <p className="text-white text-xs font-semibold truncate leading-none mb-1">
              {session?.user.email}
            </p>
            <div className="flex items-center gap-2">
               <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
               <p className="text-slate-400 text-[10px] font-medium uppercase tracking-tighter">
                {session?.user.credits} Credits
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
