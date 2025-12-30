import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  FolderOpenIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  User,
  CreditCard,
  FileText
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", href: "/client", icon: LayoutDashboardIcon },
    { name: "Mes réservations", href: "/client/requests", icon: FolderOpenIcon },
    { name: "Factures", href: "/client/invoices", icon: FileText },
    { name: "Profile", href: "/client/profile", icon: User },
  ];

  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSidebarOpen]);

  // Check if desktop to show collapsed state correctly
  const isDesktop = window.innerWidth >= 768;

  return (
    <aside
      ref={sidebarRef}
      className={`bg-[#0F172A] flex flex-col ${isSidebarOpen ? 'w-64' : isDesktop ? 'w-20 ' : 'w-0 transition-all duration-300'
        } h-screen fixed lg:static z-[100] overflow-hidden shadow-xl lg:shadow-none`}
    >
      <div className="p-6 flex items-center justify-between h-20">
        <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center w-full'}`}>
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
            end={item.href === "/client"}
            onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
            className={({ isActive }) => {
              const isItemActive = isActive;

              return `flex items-center gap-3 w-full px-4 py-1 rounded-xl transition-all duration-200 group ${isItemActive
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`;
            }}
          >
            <item.icon size={20} />
            {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
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
        {/* User Info */}
        <div>
          <NavLink to="/client/profile" onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="flex items-center gap-3 mb-2 p-2 rounded-lg hover:bg-slate-800 transition-colors group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white ring-2 ring-slate-700 group-hover:ring-orange-500 transition-all">
              <User size={20} />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">Client User</p>
                <p className="text-xs text-slate-400 truncate">Voir le profil</p>
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
