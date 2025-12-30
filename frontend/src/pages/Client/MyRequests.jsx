import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { demandesServicesPrestataire } from '../../assets/data';

// Extracted Components
import RequestsHeader from '../../components/Client/RequestsHeader';
import RequestsFilter from '../../components/Client/RequestsFilter';
import RequestCard from '../../components/Client/RequestCard';

const MyRequests = () => {
    const navigate = useNavigate();
    // Mock Logged In Client
    const currentClientId = "client_1";

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const demandes = useMemo(() => {
        return demandesServicesPrestataire.filter(d => d.client.id === currentClientId);
    }, []);

    const filteredDemandes = useMemo(() => {
        return demandes.filter(d => {
            const matchesSearch = d.service.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "ALL" || d.statut === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [demandes, searchTerm, statusFilter]);

    return (
        <div className="animate-in fade-in duration-500 space-y-8 pb-10">
            {/* Header */}
            <RequestsHeader />

            {/* Filters & Search Bar */}
            {/* <RequestsFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            /> */}

            {/* Demandes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDemandes.length > 0 ? (
                    filteredDemandes.map((demande) => (
                        <RequestCard key={demande.id} demande={demande} navigate={navigate} />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-800">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Search className="text-gray-300 dark:text-gray-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Aucune demande trouvée</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm text-center">Aucun service ne correspond à votre recherche ou à vos filtres actuels.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setStatusFilter("ALL") }}
                            className="mt-6 text-orange-600 font-bold hover:underline"
                        >
                            Effacer les filtres
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRequests;
