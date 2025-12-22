import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import Logo from "./Logo";
import {
  FolderOpenIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboardIcon },
    { name: "Reservations", href: "/services", icon: FolderOpenIcon },
    { name: "Payement", href: "/payement", icon: UsersIcon },
    { name: "Mes services offerts", href: "/", icon: UsersIcon },
  ];

  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`z-10 bg-white dark:bg-zinc-900 min-w-68 flex flex-col h-screen border-r border-gray-200 dark:border-zinc-800 max-sm:absolute transition-all ${
        isSidebarOpen ? "left-0" : "-left-full"
      } `}
    >
      <Logo />
      <hr className="border-gray-200 dark:border-zinc-800" />
      <div className="flex-1 overflow-y-scroll no-scrollbar flex flex-col">
        <div>
          <div className="p-4">
            {menuItems.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 text-gray-800 dark:text-zinc-100 cursor-pointer rounded transition-all  ${
                    isActive
                      ? "bg-orange/40 dark:bg-gradient-to-br dark:from-orange/50 dark:to-orange/50  dark:ring-zinc-800"
                      : "hover:bg-gray-50 dark:hover:bg-zinc-800/60"
                  }`
                }
              >
                <item.icon size={16} />
                <p className="text-md max-md:text-sm truncate">{item.name}</p>
              </NavLink>
            ))}
            <button className="flex w-full items-center gap-3 py-2 px-4 text-gray-800 dark:text-zinc-100 cursor-pointer rounded hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-all">
              <SettingsIcon size={16} />
              <p className="text-sm truncate">Settings</p>
            </button>
          </div>
          {/* <MyTasksSidebar /> */}
          {/* <ProjectSidebar />  */}
        </div>
        {/* infos user  */}
        <div className="mt-auto p-4 flex items-center gap-3 border-t border-gray-200 dark:border-zinc-800">
          <div className="w-8 h-8 bg-gray-300 dark:bg-zinc-700 rounded-full">
            
          </div>
          <div>
            <p className="font-semibold text-gray-600 dark:text-gray-100">Alpha Oumar Balde</p>
            <p className="text-gray-400 text-xs">alphaoumaraob97@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
