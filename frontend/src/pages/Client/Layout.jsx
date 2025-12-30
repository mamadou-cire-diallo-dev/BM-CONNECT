import { useState, useEffect } from 'react'
import Navbar from '../../components/Client/Navbar'
import Sidebar from '../../components/Client/Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheme } from '../../features/themeSlice'


const LayoutClient = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024)

    const dispatch = useDispatch()

    // Initial load of theme
    useEffect(() => {
        dispatch(loadTheme())
    }, [])

    return (
        <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col h-screen">
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div className="flex-1 h-full p-6 xl:p-10 xl:px-8 overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutClient
