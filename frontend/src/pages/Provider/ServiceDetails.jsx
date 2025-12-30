import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Download,
  Share2,
  Briefcase,
  User,
  Star,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Wallet,
  XCircle,
  ChevronDown,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { paiementsAvecDetails } from "../../assets/data";
import SectionHeader from "../../components/Provider/SectionHeader";
import { demandesServicesPrestataire } from "../../assets/data";

export default function ServiceDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [demand, setDemand] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  useEffect(() => {
    if (demandesServicesPrestataire && demandesServicesPrestataire.length > 0) {
      const foundDemand = demandesServicesPrestataire.find((d) => d.id === id);
      setDemand(foundDemand);
    }
  }, [id]);

  if (!demand) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 text-slate-400">
        <div className="w-24 h-24 bg-slate-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Search size={48} />
        </div>
        <p className="text-xl font-medium">Recherche du projet...</p>
      </div>
    );
  }

  const statusConfig = {
    PLANNING: {
      color: "text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400",
      icon: Calendar,
      label: "Planifié",
    },
    ACTIVE: {
      color:
        "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400",
      icon: TrendingUp,
      label: "En Cours",
    },
    COMPLETED: {
      color:
        "text-indigo-600 bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400",
      icon: CheckCircle2,
      label: "Terminé",
    },
    CANCELLED: {
      color: "text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400",
      icon: AlertCircle,
      label: "Annulé",
    },
    ACCEPTED: {
      color: "text-teal-600 bg-teal-100 dark:bg-teal-500/20 dark:text-teal-400",
      icon: CheckCircle2,
      label: "Accepté",
    },
    REFUSED: {
      color: "text-rose-600 bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400",
      icon: XCircle,
      label: "Refusé",
    },
  };

  const handleStatusChange = (newStatus) => {
    setDemand({ ...demand, statut: newStatus });
    setIsStatusMenuOpen(false);
  };

  const statusInfo = statusConfig[demand.statut] || statusConfig.PLANNING;
  const StatusIcon = statusInfo.icon;

  const relevantPayments = paiementsAvecDetails.filter(
    (p) => p.demandeService.id === demand.id
  );

  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-black/95 pb-20 animate-in fade-in duration-700"
      onClick={() => setIsStatusMenuOpen(false)}
    >
      {/* --- HERO HEADER --- */}
      <div className="relative h-[250px] md:h-[320px] overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-orange-950 dark:via-zinc-900 dark:to-zinc-950" />

        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-96 h-96 fill-white"
          >
            <path
              d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,88.5,-3.3C86.9,11.4,81,25.3,71.8,37.6C62.6,49.9,50.1,60.6,36.4,68.6C22.7,76.6,7.8,81.9,-5.8,80.4C-19.4,78.9,-31.7,70.6,-43.3,61.4C-54.9,52.2,-65.8,42.1,-73.9,29.9C-82,17.7,-87.3,3.4,-85.5,-10.1C-83.7,-23.6,-74.8,-36.3,-64,-46.8C-53.2,-57.3,-40.5,-65.6,-27.1,-73.2C-13.7,-80.8,0.4,-87.7,14.6,-87.8C28.8,-87.9,43.3,-81.2,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8 md:pb-20">
          {/* Breadcrumb / Back */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-4 md:left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Retour aux services</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsStatusMenuOpen(!isStatusMenuOpen);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg cursor-pointer hover:scale-105 transition-transform ${statusInfo.color
                    .replace("bg-", "bg-white/10 ")
                    .replace("text-", "text-white ")}`}
                >
                  <StatusIcon size={14} />
                  {statusInfo.label}
                  <ChevronDown size={14} className="ml-1 opacity-70" />
                </button>

                {/* Status Dropdown */}
                {isStatusMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-1">
                      <button
                        onClick={() => handleStatusChange("ACCEPTED")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg"
                      >
                        <CheckCircle2 size={16} className="text-teal-500" />{" "}
                        Accepter
                      </button>
                      <button
                        onClick={() => handleStatusChange("ACTIVE")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg"
                      >
                        <TrendingUp size={16} className="text-emerald-500" /> En
                        Cours
                      </button>
                      <button
                        onClick={() => handleStatusChange("COMPLETED")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg"
                      >
                        <CheckCircle2 size={16} className="text-indigo-500" />{" "}
                        Terminer
                      </button>
                      <hr className="my-1 border-slate-100 dark:border-zinc-800" />
                      <button
                        onClick={() => handleStatusChange("REFUSED")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg"
                      >
                        <XCircle size={16} className="text-rose-500" /> Refuser
                      </button>
                      <button
                        onClick={() => handleStatusChange("CANCELLED")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg"
                      >
                        <AlertCircle size={16} className="text-slate-500" />{" "}
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
                  <Clock size={14} />
                  Mis à jour le {format(new Date(), "d MMM", { locale: fr })}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {demand.service.titre}
              </h1>

              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-2 text-sm md:text-base bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Briefcase size={16} className="text-orange-400" />
                  {demand.service.category || "Service Général"}
                </span>
                <span className="flex items-center gap-2 text-sm md:text-base font-mono text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                  ID: #{demand.id?.substring(0, 6).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Price Tag */}
            <div className="flex flex-col items-start md:items-end gap-2 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                Montant Estimé
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-black text-white">
                  {demand.service.prix}
                </span>
                <span className="text-lg font-bold text-orange-400">GNF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN (Info & Description) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-[100px] pointer-events-none" />

              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-slate-400 dark:text-zinc-500 shadow-inner">
                  <User size={32} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-[3px] border-white dark:border-zinc-900">
                  <CheckCircle2 size={12} fill="currentColor" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {demand.client.nom}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center md:justify-start gap-2">
                  <MapPin size={14} />
                  Mamou-Almamya Dumez
                </p>

                <div className="flex items-center justify-center md:justify-start gap-3 pt-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all">
                    <Phone size={16} />
                    <span>Appeler</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl text-sm font-bold transition-all border border-orange-100 dark:border-orange-800/30">
                    <MessageSquare size={16} />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {["overview", "tasks", "files"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20"
                      : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-100 dark:border-zinc-800"
                  }`}
                >
                  {tab === "overview" && "Vue d'ensemble"}
                  {tab === "tasks" && "Tâches & Suivi"}
                  {tab === "files" && "Fichiers & Devis"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-zinc-800 min-h-[400px]">
              {activeTab === "overview" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <FileText className="text-orange-500" size={20} />
                      Description du besoin
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800">
                      {demand.description ||
                        "Aucune description fournie pour ce projet."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Calendar className="text-orange-500" size={20} />
                      Planning & Dates
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Clock size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                            Date de demande
                          </p>
                          <p className="text-slate-900 dark:text-white font-medium">
                            {format(new Date(demand.date), "dd MMMM yyyy", {
                              locale: fr,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                            Garantie
                          </p>
                          <p className="text-slate-900 dark:text-white font-medium">
                            Standard (30 jours)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-zinc-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Wallet className="text-orange-500" size={20} />
                      <SectionHeader title="Historique des Paiements" />
                    </h3>

                    {relevantPayments.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 italic bg-slate-50 dark:bg-zinc-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800">
                        Aucun paiement enregistré pour ce projet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {relevantPayments.map((paiement) => (
                          <div
                            key={paiement.id}
                            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  paiement.statut === "PAYE"
                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                    : "bg-amber-100 text-amber-600"
                                }`}
                              >
                                <CreditCard size={18} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 dark:text-white">
                                  {paiement.montant.toLocaleString()} GNF
                                </p>
                                <p className="text-xs text-slate-500">
                                  {format(
                                    new Date(paiement.datePaiement),
                                    "dd MMM yyyy",
                                    { locale: fr }
                                  )}{" "}
                                  • {paiement.modePaiement}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                paiement.statut === "PAYE"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {paiement.statut}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab !== "overview" && (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <Briefcase size={48} className="mb-4 opacity-20" />
                  <p>Fonctionnalité en cours de développement...</p>
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN (Actions & Quick Info) --- */}
          <div className="space-y-6">
            {/* Actions Box */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Actions Rapides
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleStatusChange("COMPLETED")}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all shadow-lg shadow-orange-500/30 group"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Terminer le projet
                  </span>
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 font-medium transition-all group border border-slate-100 dark:border-zinc-700">
                  <span className="flex items-center gap-2">
                    <Download size={18} />
                    Télécharger devis
                  </span>
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 font-medium transition-all group border border-slate-100 dark:border-zinc-700">
                  <span className="flex items-center gap-2">
                    <Share2 size={18} />
                    Partager
                  </span>
                </button>
              </div>
            </div>

            {/* Progress Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-zinc-900 dark:to-black rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 text-white border border-slate-700 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Progression
                </h3>
                <span className="text-orange-500 font-black">35%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 mb-6">
                <div className="bg-orange-500 h-2 rounded-full w-[35%]" />
              </div>
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                  +2
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center">
                Dernière activité il y a 2h par{" "}
                <span className="text-white font-bold">Admin</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
