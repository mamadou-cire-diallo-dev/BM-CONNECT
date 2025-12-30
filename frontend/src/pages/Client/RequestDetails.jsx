import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { paiementsAvecDetails, demandesServicesPrestataire } from "../../assets/data";

// Extracted Components
import RequestHero from "../../components/Client/RequestHero";
import ProviderCard from "../../components/Client/ProviderCard";
import RequestTabs from "../../components/Client/RequestTabs";
import RequestActions from "../../components/Client/RequestActions";
import PaymentModals from "../../components/Client/PaymentModals";

export default function RequestDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [demand, setDemand] = useState(null);

    const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
    const [isServicePaymentModalOpen, setIsServicePaymentModalOpen] = useState(false);

    useEffect(() => {
        if (demandesServicesPrestataire && demandesServicesPrestataire.length > 0) {
            const foundDemand = demandesServicesPrestataire.find((d) => d.id === id);
            setDemand(foundDemand);
        }
    }, [id]);

    const handleDiagnosticPayment = () => {
        // Simulate payment
        const updatedDemand = { ...demand, isDiagnosticPaid: true };
        setDemand(updatedDemand);
        setIsDiagnosticModalOpen(false);
        // In a real app, you would make an API call here
    };

    const handleServicePayment = () => {
        // Simulate payment
        const updatedDemand = { ...demand, isServicePaid: true, statut: 'COMPLETED' };
        setDemand(updatedDemand);
        setIsServicePaymentModalOpen(false);
        // In a real app, you would make an API call here
    };

    if (!demand) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 text-slate-400">
                <div className="w-24 h-24 bg-slate-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Search size={48} />
                </div>
                <p className="text-xl font-medium">Recherche de la demande...</p>
            </div>
        );
    }

    const relevantPayments = paiementsAvecDetails.filter(p => p.demandeService.id === demand.id);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black/95 pb-20 animate-in fade-in duration-700">

            {/* --- HERO HEADER --- */}
            <RequestHero demand={demand} navigate={navigate} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN (Info & Description) --- */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Provider Card */}
                        <ProviderCard />

                        {/* Tabs Navigation & Content */}
                        <RequestTabs demand={demand} relevantPayments={relevantPayments} />

                    </div>

                    {/* --- RIGHT COLUMN (Actions & Quick Info) --- */}
                    <div className="space-y-6">

                        {/* Actions Box */}
                        <RequestActions
                            demand={demand}
                            setIsDiagnosticModalOpen={setIsDiagnosticModalOpen}
                            setIsServicePaymentModalOpen={setIsServicePaymentModalOpen}
                        />

                    </div>

                </div>
            </div>

            {/* --- PAYMENT MODALS --- */}
            <PaymentModals
                isDiagnosticModalOpen={isDiagnosticModalOpen}
                setIsDiagnosticModalOpen={setIsDiagnosticModalOpen}
                isServicePaymentModalOpen={isServicePaymentModalOpen}
                setIsServicePaymentModalOpen={setIsServicePaymentModalOpen}
                demand={demand}
                handleDiagnosticPayment={handleDiagnosticPayment}
                handleServicePayment={handleServicePayment}
            />

        </div>
    );
}
