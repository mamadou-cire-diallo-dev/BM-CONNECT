import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  PlusIcon,
  SettingsIcon,
  BarChart3Icon,
  CalendarIcon,
  FileStackIcon,
  ZapIcon,
  UsersIcon,
  Calendar,
  PhoneCall,
  LocationEditIcon,
  LocationEdit,
} from "lucide-react";

import { paiementsAvecDetails } from "../assets/data";
import { demandesServicesPrestataire } from "../assets/data";

export default function ProjectDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const id = searchParams.get("id");

  const navigate = useNavigate();
  const projects = useSelector(
    (state) => state?.workspace?.currentWorkspace?.projects || []
  );

  const [demand, setDemandt] = useState(null);
  
  const [showCreateTask, setShowCreateTask] = useState(false);
  

  
  useEffect(() => {
    
    if (demandesServicesPrestataire && demandesServicesPrestataire.length > 0) {
      const demand = demandesServicesPrestataire.find((d) => d.id === id);
      setDemandt(demand);
    }
  }, [id, demandesServicesPrestataire, tab]);
  

  const statusColors = {
    PLANNING: "bg-zinc-200 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-200",
    ACTIVE:
      "bg-emerald-200 text-emerald-900 dark:bg-emerald-500 dark:text-emerald-900",
    ON_HOLD:
      "bg-amber-200 text-amber-900 dark:bg-amber-500 dark:text-amber-900",
    COMPLETED: "bg-blue-200 text-blue-900 dark:bg-blue-500 dark:text-blue-900",
    CANCELLED: "bg-red-200 text-red-900 dark:bg-red-500 dark:text-red-900",
  };

  if (!demand) {
    return (
      <div className="p-6 text-center text-zinc-900 dark:text-zinc-200">
        <p className="text-3xl md:text-5xl mt-40 mb-10">Project not found</p>
        <button
          onClick={() => navigate("/services")}
          className="mt-4 px-4 py-2 rounded bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-6xl mx-auto text-zinc-900 dark:text-white">
      {/* Header */}
      <div className="flex max-md:flex-col gap-4 flex-wrap items-start justify-between max-w-6xl">
        <div className="flex items-center gap-4">
          <button
            className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
            onClick={() => navigate("/services")}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-medium">{demand.service.titre}</h1>
            <span
              className={`px-2 py-1 rounded text-xs capitalize ${
                statusColors[demand.statut]
              }`}
            >
              {demand.statut.replace("_", " ")}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowCreateTask(true)}
          className="flex items-center gap-2 px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <PlusIcon className="size-4" />
          New Task
        </button>
      </div>

      {/* Info Cards */}
      {/* <div className="grid grid-cols-2 sm:flex flex-wrap gap-6">
        {[
          {
            label: "Total Tasks",
            value: tasks.length,
            color: "text-zinc-900 dark:text-white",
          },
          {
            label: "Completed",
            value: tasks.filter((t) => t.status === "DONE").length,
            color: "text-emerald-700 dark:text-emerald-400",
          },
          {
            label: "In Progress",
            value: tasks.filter(
              (t) => t.status === "IN_PROGRESS" || t.status === "TODO"
            ).length,
            color: "text-amber-700 dark:text-amber-400",
          },
          {
            label: "Team Members",
            value: demand.prix || 0,
            color: "text-blue-700 dark:text-blue-400",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className=" dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex justify-between sm:min-w-60 p-4 py-2.5 rounded"
          >
            <div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {card.label}
              </div>
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </div>
            <ZapIcon className={`size-4 ${card.color}`} />
          </div>
        ))}
      </div> */}

      {/* Tabs */}
      {/* <div>
        <div className="inline-flex flex-wrap max-sm:grid grid-cols-3 gap-2 border border-zinc-200 dark:border-zinc-800 rounded overflow-hidden">
          {[
            { key: "tasks", label: "Tasks", icon: FileStackIcon },
            { key: "calendar", label: "Calendar", icon: CalendarIcon },
            { key: "analytics", label: "Analytics", icon: BarChart3Icon },
            { key: "settings", label: "Settings", icon: SettingsIcon },
          ].map((tabItem) => (
            <button
              key={tabItem.key}
              onClick={() => {
                setActiveTab(tabItem.key);
                setSearchParams({ id: id, tab: tabItem.key });
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
              <ProjectTasks tasks={tasks} />
            </div>
          )}
          {activeTab === "analytics" && (
            <div className=" dark:bg-zinc-900/40 rounded max-w-6xl">
              <ProjectAnalytics tasks={tasks} project={project} />
            </div>
          )}
          {activeTab === "calendar" && (
            <div className=" dark:bg-zinc-900/40 rounded max-w-6xl">
              <ProjectCalendar tasks={tasks} />
            </div>
          )}
          {activeTab === "settings" && (
            <div className=" dark:bg-zinc-900/40 rounded max-w-6xl">
              <ProjectSettings project={project} />
            </div>
          )}
        </div>
      </div> */}

      {/* details de demande de service */}
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
        <div className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 rounded-lg overflow-hidden">
          <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
            <h2 className="text-md text-zinc-800 dark:text-zinc-300">
              Details de la demande de service
            </h2>
            <span
              className={`text-xs px-2 py-1 rounded ${
                statusColors[demand.statut]
              }`}
            >
              {demand.statut
                .replace("_", " ")
                .replaceAll(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </div>
          <div className="block p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-300 mb-1">
                  {demand.service.titre}
                </h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-400 line-clamp-2">
                  {demand.description || "No description"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-xl text-blue-500 gap-1">
                  <UsersIcon className="w-4 h-4" />
                  {demand.client.nom}
                </div>

                <div className="flex items-center text-xl text-green-500 gap-1">
                  <PhoneCall className="w-4 h-4" />
                  {demand.client.telephone}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LocationEdit className="w-4 h-4" />
              Mamou-Almamya Dumez
            </div>
          </div>
        </div>
        {/* demande de paiement concernat la demade */}
        <div className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 rounded-lg overflow-hidden">
          <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
            <h2 className="text-xl text-zinc-800 dark:text-zinc-300">
              Paiement associés
            </h2>
          </div>
          {paiementsAvecDetails.length === 0 && (
            <p className="p-4 text-zinc-600 dark:text-zinc-400">
              Aucun paiement trouvé pour cette demande de service.
            </p>
          )}
          {paiementsAvecDetails.length > 0 &&
            paiementsAvecDetails
              .filter((p) => p.demandeService.id === demand.id)
              .map((paiement) => (
                <div
                  key={paiement.id}
                  className="mb-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded"
                >
                  <p>
                    <strong>Montant:</strong> {paiement.montant} GNF
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(paiement.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Méthode:</strong> {paiement.modePaiement}
                  </p>
                  <p>
                    <strong>Statut:</strong> {paiement.statut}
                  </p>
                </div>
              ))}
        </div>
      </div>
      {/* Create Task Modal */}
      {showCreateTask && (
        <CreateTaskDialog
          showCreateTask={showCreateTask}
          setShowCreateTask={setShowCreateTask}
          projectId={id}
        />
      )}
    </div>
  );
}
