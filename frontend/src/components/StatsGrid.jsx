import {
  FolderOpen,
  CheckCircle,
  Users,
  AlertTriangle,
  LoaderIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { demandesServicesPrestataire } from "../assets/data";

export default function StatsGrid() {
  const [stats, setStats] = useState({
    totalDemande: 0,
    activeDemande: 0,
    completedDemande: 0,
    myTasks: 0,
    overdueDemande: 0,
  });

  const statCards = [
    {
      icon: FolderOpen,
      title: "Demande en attente",
      value: stats.totalDemande,
      subtitle: `Demande en attente`,
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
      bgGradient:
        "bg-gradient-to-br from-purple-500/90 via-purple-400/80 to-violet-600",
    },
    {
      icon: CheckCircle,
      title: "Demande terminé",
      value: stats.completedDemande,
      subtitle: `Prestation terminée`,
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
      bgGradient:
        "bg-gradient-to-br from-amber-500/20 via-amber-400/15 to-orange-600/10",
    },
    {
      icon: LoaderIcon,
      title: "Demande en cours",
      value: stats.myTasks,
      subtitle: "En cours de travaux",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
      bgGradient:
        "bg-gradient-to-br from-emerald-500/20 via-emerald-400/15 to-green-600/10",
    },
    {
      icon: AlertTriangle,
      title: "Demande en retard ",
      value: stats.overdueIssues,
      subtitle: "need attention",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
        bgGradient: "bg-gradient-to-br from-zinc-900 via-zinc-800/50 to-zinc-900"
    },
  ];

  useEffect(() => {
    if (demandesServicesPrestataire) {
      setStats({
        totalDemande: demandesServicesPrestataire.length,
        completedDemande: demandesServicesPrestataire.filter(
          (p) => p.statut === "COMPLETED"
        ).length,
        overdueDemande: demandesServicesPrestataire.filter(
          (p) => p.statut === "CANCELLED"
        ).length,
      });
    }
  }, [demandesServicesPrestataire]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-9">
      {statCards.map(
        (
          {
            icon: Icon,
            title,
            value,
            subtitle,
            bgColor,
            textColor,
            bgGradient,
          },
          i
        ) => (
          <div
            key={i}
            className={`${bgGradient} dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition duration-200 rounded-md`}
          >
            <div className="p-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    {title}
                  </p>
                  <p className="text-3xl font-bold text-zinc-800 dark:text-white">
                    {value}
                  </p>
                  {subtitle && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${bgColor} bg-opacity-20`}>
                  <Icon size={20} className={textColor} />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
