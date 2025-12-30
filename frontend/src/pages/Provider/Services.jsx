import { useState, useEffect, useRef } from "react";
import {
  Search,
  FolderOpen,
  List,
  Grid2X2,
  MoreHorizontal,
  Calendar,
  Clock,
  Users,
  Briefcase,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

import ServiceCard from "../../components/Provider/ServiceCard.jsx";
import { demandesServicesPrestataire } from "../../assets/data";

import ServicesHero from '../../components/Provider/Services/ServicesHero';
import ServicesControls from '../../components/Provider/Services/ServicesControls';
import EmptyState from "../../components/Provider/EmptyState";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/Provider/StatusBadge.jsx";


export default function Services() {
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    status: "ALL",
  });

  const filterDemandes = () => {
    let filtered = demandesServicesPrestataire;

    if (searchTerm) {
      filtered = filtered.filter(
        (demand) =>
          demand.service.titre
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          demand.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          demand.client.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== "ALL") {
      filtered = filtered.filter((demand) => demand.statut === filters.status);
    }

    setFilteredDemandes(filtered);
  };

  useEffect(() => {
    filterDemandes();
  }, [demandesServicesPrestataire, searchTerm, filters]);

  // Stats calculation
  const totalServices = demandesServicesPrestataire.length;
  const activeServices = demandesServicesPrestataire.filter(
    (d) => d.statut === "ACTIVE"
  ).length;
  const completedServices = demandesServicesPrestataire.filter(
    (d) => d.statut === "COMPLETED"
  ).length;
  const pendingServices = demandesServicesPrestataire.filter(
    (d) => d.statut === "PENDING"
  ).length;

  return (
    <div className="min-h-screen space-y-6 animate-in fade-in duration-700 pb-10">
      {/* --- HERO HEADER --- */}
      <ServicesHero total={totalServices} active={activeServices} pending={pendingServices} completed={completedServices} />

      {/* --- CONTROLS --- */}
      <ServicesControls searchTerm={searchTerm} setSearchTerm={setSearchTerm} filters={filters} setFilters={setFilters} viewMode={viewMode} setViewMode={setViewMode} />

      {/* --- CONTENT --- */}
      {filteredDemandes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-500">
          <EmptyState icon={Search} title="Aucun résultat trouvé" description={"Nous n'avons trouvé aucune demande correspondant à vos critères."} />
          <div className="mt-4">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilters({ status: "ALL" });
              }}
              className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Réinitialiser tout
            </button>
          </div>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700">
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
                        <th className="px-2 py-2.5 text-left font-medium text-md">
                          #N°
                        </th>
                        <th className="px-2 py-2.5 text-left font-medium text-md">
                          Titre
                        </th>
                        <th className="px-2 py-2.5 text-left font-medium text-md">
                          Client
                        </th>
                        <th className="px-2 py-2.5 text-left font-medium text-md">
                          Tel
                        </th>
                        <th className=" py-2.5 text-left font-medium text-md">
                          Date de Reservation
                        </th>
                        <th className="py-2.5 text-left font-medium text-md">
                          Date de ervices
                        </th>
                        <th className="px-2 py-2.5 text-left font-medium text-md">
                          Status
                        </th>
                        <th className="px-2 py-2.5 text-left font-medium text-md"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                      {filteredDemandes.map((demand,index) => (
                        <tr
                          key={demand.id}
                          className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                        >
                          <td className="px-2 py-2.5 whitespace-nowrap text-sm font-bold text-gray-700 dark:text-zinc-300">
                            {index + 1}
                          </td>
                          <td className="pl-3 py-2.5 whitespace-nowrap flex items-center gap-3">
                            <span className="text-sm text-zinc-800 dark:text-white truncate">
                              {demand.service.titre}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                            {demand.client.nom}
                          </td>
                          <td className="px-2 py-2.5 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                            {demand.client.telephone}
                          </td>
                          <td className="text-sm ">
                            <span>
                              {format(
                                new Date(demand.date),
                                "dd MMM yyyy HH:mm"
                              )}
                            </span>
                          </td>

                          <td className="flex items-center text-sm gap-1 text-blue-400 font-semibold px-2 py-2.5">
                            <Calendar
                              size={16}
                              className="text-gray-500 dark:text-zinc-400"
                            />{" "}
                            {format(new Date(demand.date), "dd MMM yyyy HH:mm")}
                          </td>

                          <td className="px-2 py-2.5 whitespace-nowrap">
                            <StatusBadge status={demand.statut} />
                          </td>
                          <td className="px-2 py-2.5">
                            <Link
                              to={`/provider/serviceDetail?id=${demand.id}`}
                              className="p-2 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors inline-flex"
                            >
                              <MoreHorizontal size={18} />
                            </Link>
                          </td>
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
