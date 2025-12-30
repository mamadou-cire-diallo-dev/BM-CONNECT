import React from 'react';
import { Briefcase } from 'lucide-react';

const RequestsHeader = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Mes Demandes</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Suivez l'état d'avancement de vos services.</p>
            </div>
            {/* <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Briefcase size={18} />
                <span>Nouvelle Demande</span>
            </button> */}
        </div>
    );
};

export default RequestsHeader;
