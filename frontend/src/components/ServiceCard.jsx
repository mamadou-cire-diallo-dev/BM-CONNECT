import { format } from "date-fns";
import { Calendar, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const statusColors = {

  ACTIVE: "bg-emerald-200 dark:bg-emerald-500 text-emerald-900 dark:text-emerald-900",
  
  PENDING:"bg-yellow-200 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-900",
  COMPLETED: "bg-blue-200 dark:bg-blue-500 text-blue-900 dark:text-blue-900",
  CANCELED: " dark:bg-red-500 text-white ",
};

const ServiceCard = ({ demand }) => {
  return (
    <Link
      to={`/provider/serviceDetail?id=${demand.id}&tab=tasks`}
      className="bg-white dark:bg-zinc-950 dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 rounded-lg p-5 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-semibold text-gray-900 dark:text-zinc-200 mb-1 truncate group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {demand.service.titre}
            </h3>
            <p className="text-gray-500 flex items-center justify-center dark:text-zinc-400 p-2 rounded-2xl hover:bg-gray-700">
              {/* icon lucide ... */}
            </p>
          </div>
          <p className="text-blue text-sm line-clamp-2 mb-3">
            {demand.description.length > 50
              ? demand.description.slice(0, 45) + "..."
              : demand.description || "No description"}
          </p>
          <p className="flex items-center gap-1 text-blue dark:text-zinc-400 text-sm line-clamp-2 mb-3">
            <User2 size={16} className="text-gray-500 dark:text-zinc-400" />{" "}
            {demand.client.nom} | {demand.client.telephone}
          </p>
          <p className="flex items-center gap-1 text-blue-400 font-semibold">
            <Calendar size={16} className="text-gray-500 dark:text-zinc-400" />{" "}
            {format(new Date(demand.date), "dd MMM yyyy hh MM")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-0.5 rounded text-xs ${
            statusColors[demand.statut]
          }`}
        >
          {demand.statut.replace("_", " ")}
        </span>
        <span>{demand.service.prix} GNF</span>
      </div>
    </Link>
  );
};

export default ServiceCard;
