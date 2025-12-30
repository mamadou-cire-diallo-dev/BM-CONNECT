import { SearchIcon, PanelLeft, Bell } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../features/themeSlice'
import { MoonIcon, SunIcon } from 'lucide-react'
import { assets } from '../../assets/assets'

const Navbar = ({ setIsSidebarOpen }) => {

    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);

    return (
        <div className="sticky top-0 z-30 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800 px-6 xl:px-10 py-4 flex-shrink-0 transition-all duration-300">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Left section */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Sidebar Trigger */}
                    <button onClick={() => setIsSidebarOpen((prev) => !prev)} className="p-2 rounded-xl transition-colors text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800" >
                        <PanelLeft size={20} />
                    </button>

                    {/* Search Input */}
                    <div className="relative flex-1 max-w-sm hidden md:block">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 size-4" />
                        <input
                            type="text"
                            placeholder="Rechercher un service..."
                            className="pl-10 pr-4 py-2.5 w-full bg-gray-100 dark:bg-zinc-800/50 border-none rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3 sm:gap-4">

                    <button className="relative size-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600 dark:text-gray-300">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                    </button>

                    {/* Theme Toggle */}
                    <button onClick={() => dispatch(toggleTheme())} className="size-10 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-xl transition hover:scale-105 active:scale-95">
                        {
                            theme === "light"
                                ? (<MoonIcon className="size-5 text-gray-800 dark:text-gray-200" />)
                                : (<SunIcon className="size-5 text-yellow-400" />)
                        }
                    </button>

                    {/* User Button */}
                    <div className="flex items-center gap-3 pl-2 sm:border-l border-gray-200 dark:border-zinc-700">
                        <img src={assets.profile_img_a} alt="User Avatar" className="size-9 rounded-full ring-2 ring-white dark:ring-zinc-800 shadow-sm" />
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Client User</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">client@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
