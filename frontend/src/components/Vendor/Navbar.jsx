import { SearchIcon, PanelLeft, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/themeSlice";
import { MoonIcon, SunIcon } from "lucide-react";
import { assets } from "../../assets/assets";

const Navbar = ({ setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 xl:px-16 py-3 flex-shrink-0">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Sidebar Trigger */}
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="p-2 sm:-ml-10 rounded-lg transition-colors text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <PanelLeft size={20} />
          </button>
          <h1 className="text-xl font-bold dark:text-white ml-2 hidden sm:block">Espace Vendeur</h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="size-8 flex items-center justify-center bg-white dark:bg-zinc-800 shadow rounded-lg transition hover:scale-105 active:scale-95"
          >
            {theme === "light" ? (
              <MoonIcon className="size-4 text-gray-800 dark:text-gray-200" />
            ) : (
              <SunIcon className="size-4 text-yellow-400" />
            )}
          </button>

          <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
          </button>
          {/* User Button */}
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-zinc-800 pl-3">
            <img
              src={assets.profile_img_a || "https://i.pravatar.cc/300"}
              alt="User Avatar"
              className="size-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
