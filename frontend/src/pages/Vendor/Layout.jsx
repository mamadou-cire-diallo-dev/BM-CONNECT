import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../../components/Vendor/Navbar";
import Sidebar from "../../components/Vendor/Sidebar";
import { loadTheme } from "../../features/themeSlice";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTheme());
    }, [dispatch]);

    return (
        <div className="flex bg-[#f6fafb] dark:bg-zinc-950 text-gray-900 dark:text-slate-100 h-screen overflow-hidden">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <div className="flex-1 p-5 xl:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
