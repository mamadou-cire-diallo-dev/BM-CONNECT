import React, { useMemo } from 'react';
import { facturesPrestataire, demandesServicesPrestataire } from '../../assets/data';

// Extracted Component
import InvoicesTable from '../../components/Client/InvoicesTable';

const Invoices = () => {
    const currentClientId = "client_1";

    const factures = useMemo(() => {
        return facturesPrestataire.filter(f => {
            const demande = demandesServicesPrestataire.find(d => d.id === f.demandeServiceId);
            return demande?.client.id === currentClientId;
        });
    }, []);

    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mes Factures</h1>
            </div>

            <InvoicesTable factures={factures} />
        </div>
    );
};

export default Invoices;

