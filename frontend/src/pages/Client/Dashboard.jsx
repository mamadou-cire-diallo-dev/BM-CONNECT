import React, { useMemo } from 'react'
import { demandesServicesPrestataire, facturesPrestataire } from '../../assets/data'

// Extracted Components
import DashboardHero from '../../components/Client/DashboardHero';
import DashboardStats from '../../components/Client/DashboardStats';
import RecentActivity from '../../components/Client/RecentActivity';

const Dashboard = () => {
  // Mock logged in client
  const currentClientId = "client_1";

  const clientDemandes = useMemo(() => {
    return demandesServicesPrestataire.filter(d => d.client.id === currentClientId);
  }, []);

  const clientFactures = useMemo(() => {
    // Filter invoices linked to client's demands
    return facturesPrestataire.filter(f => {
      const demande = demandesServicesPrestataire.find(d => d.id === f.demandeServiceId);
      return demande?.client.id === currentClientId;
    });
  }, []);

  // Stats Logic
  const stats = {
    totalDemandes: clientDemandes.length,
    activeDemandes: clientDemandes.filter(d => ['PENDING', 'ACTIVE', 'ACCEPTED'].includes(d.statut)).length,
    completedDemandes: clientDemandes.filter(d => d.statut === 'COMPLETED').length,
    totalDepenses: clientFactures.reduce((acc, curr) => acc + curr.montantTotal, 0)
  };

  const recentDemandes = clientDemandes.slice(0, 5);
  const latestInvoice = clientFactures.length > 0 ? clientFactures[0] : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">

      {/* Hero Section */}
      <DashboardHero />

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Recent Activity (Requests & Latest Invoice) */}
      <RecentActivity recentDemandes={recentDemandes} latestInvoice={latestInvoice} />

    </div>
  )
}

export default Dashboard
