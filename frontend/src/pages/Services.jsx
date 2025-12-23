import { useState, useEffect } from "react";
import {
  Search,
  FolderOpen,
  List,
  Grid2X2,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  Euro,
} from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import { demandesServicesPrestataire } from "../assets/data";
import { format } from "date-fns";

const StatusBadge = ({ status }) => {
  const statusColors = {
    ACTIVE:
      "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
    COMPLETED:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    ON_HOLD:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
    CANCELED: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
    default: "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300",
  };

  const colorClass = statusColors[status] || statusColors.default;

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${colorClass}`}
    >
      {status === "ACTIVE"
        ? "Actif"
        : status === "COMPLETED"
        ? "Terminé"
        : status === "ON_HOLD"
        ? "En cours"
        : status === "CANCELED"
        ? "Annulé"
        : status === "PENDING"
        ? "En attente"
        : status}
    </span>
  );
};

export default function Services() {
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    status: "ALL",
  });

  const filtereDemandes = () => {
    let filtered = demandesServicesPrestataire;

    if (searchTerm) {
      filtered = filtered.filter(
        (demand) =>
          demand.service.titre
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          demand.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== "ALL") {
      filtered = filtered.filter((demand) => demand.statut === filters.status);
    }

    setFilteredDemandes(filtered);
  };

  useEffect(() => {
    filtereDemandes();
  }, [demandesServicesPrestataire, searchTerm, filters]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Demandes de services
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Gérez et suivez l'état de vos prestations en temps réel.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline-block">
            {filteredDemandes.length} Résultat
            {filteredDemandes.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4  items-center ">
        {/* Search */}
        <div className="relative w-full md:max-w-xs group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all sm:text-sm"
            placeholder="Rechercher un service, une description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters & Toggles */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="relative flex-shrink-0">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="pl-9 pr-8 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="ACTIVE">Actif</option>
              <option value="COMPLETED">Terminé</option>
              <option value="ON_HOLD">En cours</option>
              <option value="CANCELLED">Annulé</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex-shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 text-orange-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
              title="Vue Grille"
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-700 text-orange-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
              title="Vue Liste"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredDemandes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl ">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
            <FolderOpen className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Aucune demande trouvée
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-sm text-center">
            Essayez de modifier vos filtres ou effectuez une nouvelle recherche.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilters({ status: "ALL" });
            }}
            className="mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDemandes.map((demand) => (
                <ServiceCard key={demand.id} demand={demand} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 rounded-lg transition-all duration-200 group">
              <div className="overflow-x-auto">
                <div className="hidden sm:block overflow-x-auto rounded-md border border-gray-200 dark:border-zinc-800">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
                    <thead className="bg-gray-50 dark:bg-zinc-800">
                      <tr>
                        <th className="px-6 py-2.5 text-left font-medium text-md">
                          Titre
                        </th>
                        <th className="px-6 py-2.5 text-left font-medium text-md">
                          Client
                        </th>
                        <th className="px-6 py-2.5 text-left font-medium text-md">
                          Tel
                        </th>
                        <th className=" py-2.5 text-left font-medium text-md">
                          Date de Reservation
                        </th>
                        <th className="py-2.5 text-left font-medium text-md">
                          Date de ervices
                        </th>
                        <th className="px-6 py-2.5 text-left font-medium text-md">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                      {filteredDemandes.map((demand) => (
                        <tr
                          key={demand.id}
                          className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                        >
                          <td className="px-6 py-2.5 whitespace-nowrap flex items-center gap-3">
                            {/* <img
                              src={user.user.image}
                              alt={user.user.name}
                              className="size-7 rounded-full bg-gray-200 dark:bg-zinc-800"
                            /> */}
                            <span className="text-sm text-zinc-800 dark:text-white truncate">
                              {demand.service.titre || "Unknown User"}
                            </span>
                          </td>
                          <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                            {demand.client.nom}
                          </td>
                          <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                            {demand.client.telephone}
                          </td>
                          <td className="text-sm ">
                            <span>
                            {format(new Date(demand.date), "dd MMM yyyy hh MM")}
                            </span>
                          </td>

                          <td className="flex items-center text-sm gap-1 text-blue-400 font-semibold">
                            <Calendar
                              size={16}
                              className="text-gray-500 dark:text-zinc-400"
                            />{" "}
                            {format(new Date(demand.date), "dd MMM yyyy hh MM")}
                          </td>
                          
                          <td className="px-6 py-2.5 whitespace-nowrap">
                            {demand.statut ? (
                              <StatusBadge status={demand.statut} />
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td>{}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
