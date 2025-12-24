import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import Logo from "./Logo";
import {
  FolderOpenIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
  LogOut,
  CreditCard
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const menuItems = [
    { name: "Dashboard", href: "/provider", icon: LayoutDashboardIcon },
    { name: "Reservations", href: "/provider/services", icon: FolderOpenIcon },
    { name: "Payement", href: "/provider/payement", icon: CreditCard },
    { name: "Mes services offerts", href: "/provider/service", icon: UsersIcon },

  ];

  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth < 1024) {
        // Only close on mobile interactions outside
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSidebarOpen]);
  // verifier si la taille de lecran est supérieure à md (768px) pour quant on ferme on voit les icons
  const isDesktop = window.innerWidth >= 768;

  return (
      <aside
      ref={sidebarRef}
      className={`bg-[#0F172A] flex flex-col dark:bg-zinc-900 ${isSidebarOpen ? 'w-64' : isDesktop ? 'w-20 ' : 'w-0 transition-all duration-300'
        } h-screen fixed lg:static z-[100] overflow-hidden shadow-xl lg:shadow-none`}
      >
        <div className="p-6 flex items-center justify-between h-20">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center w-full'}`}>
          {/* We can use the Logo component here if it adapts, or custom styling */}
          {/* <Logo /> */}
          {/* Using custom logo styling to match design if Logo component isn't flexible, 
                 but trying to respect the existing import. 
                 If Logo has its own styles, we might wrap it or replace it. 
                 For now, let's assume Logo is just an SVG or image and wrap it matches style.
             */}
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0 text-white font-bold">
              BM
            </div>
            {isSidebarOpen && <span className="text-white font-bold text-xl tracking-tight">CONNECT</span>}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              to={item.href}
              key={item.name}
              end={item.href === "/provider"}
              className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-1 rounded-xl transition-all duration-200 group ${isActive
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
              }
            >
            <item.icon size={20} />
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}

            {/* Active Dot for collapsed state or visual accent */}
            {/* {isSidebarOpen && isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />} */}
            </NavLink>
          ))}

          <div className="pt-8 pb-2">
            {isSidebarOpen && (
            <p className="px-4 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                Support
              </p>
            )}
          <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200 ${!isSidebarOpen && 'justify-center'}`}>
              <SettingsIcon size={20} />
              {isSidebarOpen && <span className="font-medium">Paramètres</span>}
            </button>
          </div>
        </nav>

      <div className="p-4 border-t border-slate-800">
        {/* user infos */}
        <div>
          <div className={`flex items-center gap-3 mb-2 ${!isSidebarOpen && 'justify-center'}`}>
            <img
              src="https://i.pravatar.cc/4"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            {isSidebarOpen && (
              <div>
                <p className="text-white font-medium">Alpha Oumar Balde</p>
                <p className="text-sm text-slate-400">alphaoumar@gmail.com</p>
              </div>
            )}
          </div>
        </div>
        {/* <button className={`flex items-center gap-3 w-full px-4 py-2 text-slate-400 hover:text-white transition-colors ${!isSidebarOpen && 'justify-center'}`}>
          <LogOut size={20} />
          {isSidebarOpen && <span className="font-medium">Déconnexion</span>}
          </button> */}
        </div>
      </aside>
  );
};

export default Sidebar;
