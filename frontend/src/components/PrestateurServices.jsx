import { format } from "date-fns";
import { useState, useMemo } from "react";

import {
  Bug,
  CalendarIcon,
  GitCommit,
  MessageSquare,
  Square,
  Trash,
  XIcon,
  Zap,
} from "lucide-react";
import { demandesServicesPrestataire } from "../assets/data";

const typeIcons = {
  BUG: { icon: Bug, color: "text-red-600 dark:text-red-400" },
  FEATURE: { icon: Zap, color: "text-blue-600 dark:text-blue-400" },
  TASK: { icon: Square, color: "text-green-600 dark:text-green-400" },
  IMPROVEMENT: {
    icon: GitCommit,
    color: "text-purple-600 dark:text-purple-400",
  },
  OTHER: { icon: MessageSquare, color: "text-amber-600 dark:text-amber-400" },
};

const priorityTexts = {
  LOW: {
    background: "bg-red-100 dark:bg-red-950",
    prioritycolor: "text-red-600 dark:text-red-400",
  },
  MEDIUM: {
    background: "bg-blue-100 dark:bg-blue-950",
    prioritycolor: "text-blue-600 dark:text-blue-400",
  },
  HIGH: {
    background: "bg-emerald-100 dark:bg-emerald-950",
    prioritycolor: "text-emerald-600 dark:text-emerald-400",
  },
};
const statusIcons = {
  PENDING: { icon: CalendarIcon, color: "text-amber-500",},
  ACCEPTEE: { icon: Zap, color: "text-blue-500"},
  COMPLETED: { icon: GitCommit, color: "text-emerald-500", },
  CANCELED: {icon:Bug,color:" text-red-500 dark:text-red-600",}
};

const PrestateurServices = () => {
    
  const demandes = demandesServicesPrestataire;

  const [filters, setFilters] = useState({
    statut: "",
    client: "",
    service: "",
  });


  const filteredDemandes = useMemo(() => {
    return demandes.filter((d) => {
      return (
        (!filters.statut || d.statut === filters.statut) &&
        (!filters.client || d.client.nom === filters.client) &&
        (!filters.service || d.service.titre === filters.service)
      );
    });
  }, [filters, demandes]);



  return (
    <div>

      {/* Tasks Table */}
      <div className="overflow-auto rounded-lg lg:border border-zinc-300 dark:border-zinc-800">
        <div className="w-full">
          {/* Desktop/Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full text-sm text-left not-dark:bg-white text-zinc-900 dark:text-zinc-300">
              <thead className="text-xs uppercase dark:bg-zinc-800/70 text-zinc-500 dark:text-zinc-400 ">
                <tr>
                  <th className="px-4 pl-3 py-3">Titre de Service</th>
                  <th className="px-4  py-3">Statut</th>
                  <th className="px-4 py-3">Prix</th>
                  <th className="px-4  py-3">Client</th>
                  <th className="px-4 py-3">Telephone</th>
                  <th className="px-4 py-3">Date </th>
                  <th className="px-4 py-3">Date de service</th>
                </tr>
              </thead>
              <tbody>
                {filteredDemandes.map((demande) => {
                  const { icon: Icon, color } =
                    statusIcons[demande.statut] || {};

                  return (
                    <tr
                      key={demande.id}
                      className="border-t border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all"
                    >
                      <td className="px-4 py-2.5 font-medium">
                        {demande.service.titre}
                      </td>

                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className={`size-4 ${color}`} />}
                          <span className={`text-xs uppercase ${color}`}>
                            {demande.statut}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-2.5">
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-400">
                          {demande.service.prix} €
                        </span>
                      </td>

                      <td className="px-4 py-2.5">{demande.client.nom}</td>
                      <td className="px-4 py-2.5">{demande.client.telephone}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                          <CalendarIcon className="size-4" />
                          {format(
                            new Date(demande.date),
                            "dd MMM yyyy"
                          )}
                        </div>
                      </td>
                       <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                          <CalendarIcon className="size-4" />
                          {format(
                            new Date(demande.date),
                            "dd MMM yyyy"
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile/Card View */}
          <div className="lg:hidden flex flex-col gap-4">
            {filteredDemandes.map((demande) => {
              const { icon: Icon, color } = statusIcons[demande.statut] || {};

              return (
                <div
                  key={demande.id}
                  className="border border-zinc-300 dark:border-zinc-800 rounded-lg p-4 flex flex-col gap-2"
                >
                  <h3 className="text-sm font-semibold">
                    {demande.service.titre}
                  </h3>

                  <div className="flex items-center gap-2 text-xs">
                    {Icon && <Icon className={`size-4 ${color}`} />}
                    <span className={`${color}`}>{demande.statut}</span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {demande.description}
                  </p>

                  <div className="text-sm">
                    Client : <strong>{demande.client.nom}</strong>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <CalendarIcon className="size-4" />
                    {format(new Date(demande.date), "dd MMM yyyy")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


export default PrestateurServices;