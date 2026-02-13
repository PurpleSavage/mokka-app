"use client";
import { RootState } from "@/store/boundStore";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { CiHome } from "react-icons/ci";
import { RiUserCommunityLine } from "react-icons/ri";
import { IoLayersOutline } from "react-icons/io5";
import Link from "next/link";
import { TbActivityHeartbeat } from "react-icons/tb";
import { menuOptions, Option } from "../constants/menu-options";

function Aside() {
  const session = useSelector((state: RootState) => state.auth.session);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const getFirstLetter = (name: string) => {
    return name.split("")[0];
  };
  const activeStyles = "bg-gray-200 text-black";
  const inactiveStyles = "text-white hover:bg-gray-200 hover:text-black";
  const baseStyles = "flex items-center gap-2 rounded-lg p-1 transition-colors";

  const checkActive = (option: Option) => {
    if (pathname === option.path) return true;
    if (option.allowedRoutes && option.allowedRoutes.length > 0) {
      return option.allowedRoutes.includes(pathname);
    }
    return false;
  };
  return (
    <aside className="w-62.5 sticky left-0 top-0 bottom-0 flex flex-col h-screen border-r border-slate-600/50">
      <div className="px-5 w-full border-b py-4 flex border-slate-600/50">
        <TbActivityHeartbeat size={30} color="white" />
        <p className="text-white font-bold text-4xl">Mokka</p>
      </div>

      <div className="grow flex flex-col gap-6">
        <div className="pt-4 px-4 w-full space-y-2">
          {/* Link: Home */}
          <Link
            href="/mokka/mokka-panel"
            className={`${baseStyles} ${isActive("/mokka/mokka-panel") ? activeStyles : inactiveStyles}`}
          >
            <CiHome size={20} /> Home
          </Link>

          {/* Link: Community */}
          <Link
            href="/mokka/mokka-panel/community"
            className={`${baseStyles} ${isActive("/mokka/mokka-panelcommunity") ? activeStyles : inactiveStyles}`}
          >
            <RiUserCommunityLine size={20} /> Community
          </Link>
        </div>

        <div className="overflow">
          <p className="px-5 font-medium text-gray-100">Playground</p>
          <ul className="overflow-y-auto px-4 py-2 space-y-2 w-full">
            {menuOptions.map((option) => (
              <li key={option.id}>
                <Link
                  href={option.path}
                  className={`${baseStyles} ${checkActive(option) ? activeStyles : inactiveStyles}`}
                >
                  <option.icon size={20} /> {option.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-4 w-full space-y-2">
          <p className="px-2 font-medium text-gray-100">Creative</p>
          <Link
            href="/mokka/creative-panel"
            className={`${baseStyles} ${isActive("/creative") ? activeStyles : inactiveStyles}`}
          >
            <IoLayersOutline size={20} /> Mockups generator
          </Link>
        </div>
      </div>

      {/* Footer del Aside */}
      <div className="flex gap-2 px-2 border-t border-slate-600/50 py-2">
        <div className="size-10 flex items-center justify-center border border-slate-500/50 rounded-full">
          <p className="text-white">
            {session ? getFirstLetter(session.user.email) : "U"}
          </p>
        </div>
        <div className="grow overflow-hidden">
          <p className="text-white text-sm font-medium truncate">
            {session?.user.email}
          </p>
          <p className="text-green-300 text-sm lowercase">
            Credits: {session?.user.credits}
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
