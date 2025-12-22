import {
  BarChart3Icon,
  CalendarIcon,
  FileStackIcon,
  Plus,
  SettingsIcon,
} from "lucide-react";
import { useState } from "react";
import StatsGrid from "../components/StatsGrid";
import PrestateurServices from "../components/PrestateurServices";
import Analytics from "../components/Analytics";
import Calendar from "../components/Calendar";
import { useSearchParams } from "react-router-dom";

const DashboardClient = () => {
  const user = { fullName: "User" };
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState(tab || "calendar");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 ">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            {" "}
            Bon retour, {user?.fullName || "User"}{" "}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            {" "}
            Here's what's happening with your projects today{" "}
          </p>
        </div>

      </div>

      <StatsGrid />

      {/* Tabs */}
      <div>
        <div className="inline-flex flex-wrap max-sm:grid grid-cols-3 gap-2 border border-zinc-200 dark:border-zinc-800 rounded overflow-hidden">
          {[
            { key: "tasks", label: "Reservation ", icon: FileStackIcon },
            { key: "calendar", label: "Calendrier", icon: CalendarIcon },
            { key: "analytics", label: "Analytiques", icon: BarChart3Icon },
            // { key: "settings", label: "Settings", icon: SettingsIcon },
          ].map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => {
                setActiveTab(tabItem.key);
                setSearchParams({ tab: tabItem.key });
              }}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                activeTab === tabItem.key
                  ? "bg-zinc-100 dark:bg-zinc-800/80"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-700"
              }`}
            >
              <tabItem.icon className="size-3.5" />
              {tabItem.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "tasks" && (
            <div className=" dark:bg-zinc-900/40 rounded max-w-6xl">
              <PrestateurServices />
            </div>
          )}
          {activeTab === "analytics" && (
            <div className=" dark:bg-zinc-900/40 rounded max-w-6xl">
              <Analytics tasks={tasks} project={project} />
            </div>
          )}
          {activeTab === "calendar" && (
            <div className=" dark:bg-zinc-900/40 rounded max-w-6xl">
              <Calendar tasks={tasks} />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default DashboardClient;
