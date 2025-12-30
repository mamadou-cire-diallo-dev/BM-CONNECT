import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
  isAfter,
  startOfDay,
  areIntervalsOverlapping,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  MoreVertical,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";
import SearchBar from "../../components/Provider/SearchBar";
import EmptyState from "../../components/Provider/EmptyState";
import { Link } from "react-router-dom"; // Ensure Link is imported if used, though maybe navigate is better for rows
import { demandesServicesPrestataire } from "../../assets/data";

export default function Planning() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterType, setFilterType] = useState("ALL");

  // Get days in current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Filter services based on data
  const services = useMemo(() => {
    return demandesServicesPrestataire.map((s) => ({
      ...s,
      dateObj: new Date(s.date),
    }));
  }, []);

  // Get services for selected date
  const selectedDateServices = services.filter(
    (s) =>
      isSameDay(s.dateObj, selectedDate) &&
      (filterType === "ALL" || s.statut === filterType)
  );

  // Get upcoming services (future)
  const upcomingServices = services
    .filter((s) => isAfter(s.dateObj, new Date()))
    .sort((a, b) => a.dateObj - b.dateObj)
    .slice(0, 4);

  const statusColors = {
    PLANNING:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    ACTIVE:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    COMPLETED:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
    PENDING:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
    ACCEPTED:
      "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400",
    REFUSED: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/95 p-4 animate-in fade-in duration-700 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Planning & Agenda
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gérez votre emploi du temps et visualisez vos interventions à venir.
          </p>
        </div>

        {/* <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-1 rounded-xl flex items-center">
                        <button className="px-4 py-2 rounded-lg text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md">
                            Mois
                        </button>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                            Semaine
                        </button>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                            Jour
                        </button>
                    </div>
                    <button className="p-3 bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-700 transition-transform hover:scale-105 active:scale-95">
                        <CalendarIcon size={20} />
                    </button>
                </div> */}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: CALENDAR & UPCOMING --- */}
        <div className="space-y-8">
          {/* Calendar Widget */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: fr })}
              </h2>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg text-slate-600 dark:text-slate-400 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg text-slate-600 dark:text-slate-400 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-4">
              {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day) => {
                const dayServices = services.filter((s) =>
                  isSameDay(s.dateObj, day)
                );
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentDay = isToday(day);
                const hasServices = dayServices.length > 0;

                return (
                  <button
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={`
                                    relative h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                                    ${
                                      isSelected
                                        ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105 z-10"
                                        : isCurrentDay
                                        ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/30"
                                        : "hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300"
                                    }
                                `}
                  >
                    <span
                      className={`text-sm font-bold ${
                        hasServices && !isSelected ? "mb-1" : ""
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                    {hasServices && !isSelected && (
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                        {dayServices.length > 1 && (
                          <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upcoming Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-zinc-900 dark:to-black rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 text-white border border-slate-700 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <TrendingUp size={18} className="text-orange-500" />À Venir
              </h3>
              <Link
                to="/provider/services"
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Tout voir
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingServices.map((service) => (
                <div
                  key={service.id}
                  className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                >
                  <div className="flex flex-col items-center justify-center min-w-[50px] bg-white/10 rounded-lg p-2">
                    <span className="text-xs font-bold text-orange-400 uppercase">
                      {format(service.dateObj, "MMM", { locale: fr })}
                    </span>
                    <span className="text-xl font-black">
                      {format(service.dateObj, "d")}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm truncate">
                      {service.service.titre}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      {format(service.dateObj, "HH:mm")}
                    </p>
                  </div>
                </div>
              ))}
              {upcomingServices.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">
                  Aucun service à venir.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: DAILY SCHEDULE --- */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-2 rounded-lg">
                {format(selectedDate, "d")}
              </span>
              <span className="capitalize">
                {format(selectedDate, "MMMM yyyy", { locale: fr })}
              </span>
            </h2>

            <div className="flex items-center gap-2">
              <SearchBar
                value={""}
                onChange={() => {}}
                placeholder="Filtrer..."
                onFilter={() => {}}
              />
              <button className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {selectedDateServices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-100 rounded">
                <EmptyState
                  icon={CalendarIcon}
                  title="Aucune intervention prévue ce jour."
                />
                {/* <button className="mt-4 text-orange-600 font-bold text-sm hover:underline">Ajouter une indisponibilité</button> */}
              </div>
            ) : (
              selectedDateServices.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col md:flex-row gap-0 md:gap-6 bg-white dark:bg-zinc-900 rounded-2xl p-0 md:p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 border border-slate-100 dark:border-zinc-800 transition-all duration-300 overflow-hidden"
                >
                  {/* Time Column (Mobile: Header, Desktop: Left) */}
                  <div className="flex md:flex-col items-center md:items-start justify-between md:justify-center p-4 md:p-0 bg-slate-50 md:bg-transparent dark:bg-zinc-800/50 md:dark:bg-transparent border-b md:border-b-0 border-slate-100 dark:border-zinc-800 md:w-32 flex-shrink-0">
                    <div className="text-center md:text-left">
                      <span className="block text-xl font-black text-slate-900 dark:text-white">
                        {format(service.dateObj, "HH:mm")}
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Début
                      </span>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-slate-200 dark:bg-zinc-800 my-2 ml-4"></div>
                    <div className="text-right md:text-left opacity-60">
                      <span className="block text-sm font-bold text-slate-600 dark:text-slate-400">
                        {/* Mock duration +1h */}
                        {format(
                          new Date(service.dateObj.getTime() + 60 * 60 * 1000),
                          "HH:mm"
                        )}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Fin est.
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-0 pt-2 md:pt-0 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                          {service.service.titre}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-1">
                          {service.description || "Aucune description"}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                          statusColors[service.statut] || statusColors.PLANNING
                        }`}
                      >
                        {service.statut}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                        <User size={14} />
                        <span className="font-medium">
                          {service.client.nom}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>
                          {service.client.adresse || "Adresse non renseignée"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col items-center justify-end gap-2 p-4 md:p-0 border-t md:border-t-0 border-slate-100 dark:border-zinc-800 md:border-l md:pl-6 bg-slate-50/50 md:bg-transparent dark:bg-zinc-900/50">
                    <Link
                      to={`/provider/serviceDetail?id=${service.id}`}
                      className="flex-1 md:flex-none flex items-center justify-center w-full px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold rounded-xl shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Détails
                    </Link>
                    <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-zinc-800 md:bg-transparent rounded-xl border border-slate-200 md:border-0 dark:border-zinc-700">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
