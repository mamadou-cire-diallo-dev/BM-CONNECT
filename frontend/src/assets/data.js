
export const dummyClients = [
  {
    id: "client_1",
    nom: "Aissatou Barry",
    telephone: "+224621111222",
    adresse: "Ratoma, Conakry",
  },
  {
    id: "client_2",
    nom: "Ibrahima Camara",
    telephone: "+224622333444",
    adresse: "Lambanyi, Conakry",
  },
  {
    id: "client_3",
    nom: "Fatoumata Diallo",
    telephone: "+224623555666",
    adresse: "Kipé, Conakry",
  },
];

export const demandesServicesPrestataire = [
  {
    id: "dem_1",
    description: "Fuite sous évier",
    statut: "PENDING",
    date: "2025-10-20T10:30:00.000Z",

    client: dummyClients.find((c) => c.id === "client_1"),

    service: {
      id: "serv_3",
      titre: "Réparation de l'electricite",
      prix: 150,
    },

    prestataireId: "prest_1",
  },
  {
    id: "dem_2",
    description: "Mon climatiseur ne fonctionne pas , et il fait tres chaud ! Je besoin d'une reparation rapide.",
    statut: "COMPLETED",
    date: "2025-10-18T14:00:00.000Z",
    
    client: dummyClients.find((c) => c.id === "client_1"),
  
    service: {
      id: "serv_1",
      titre: "Réparation de climatiseur",
      prix: 150,
    },

    prestataireId: "prest_1",
  },
  {
    id: "dem_3",
    description: "Reparation de climatiseur",
    statut: "COMPLETED",
    date: "2025-10-18T14:00:00.000Z",

    client: dummyClients.find((c) => c.id === "client_1"),

    service: {
      id: "serv_1",
      titre: "Réparation de climatiseur",
      prix: 150,
    },

    prestataireId: "prest_1",
  },
  {
    id: "dem_4",
    description: "Reparation de climatiseur",
    statut: "CANCELED",
    date: "2025-10-18T14:00:00.000Z",

    client: dummyClients.find((c) => c.id === "client_1"),

    service: {
      id: "serv_1",
      titre: "Réparation de climatiseur",
      prix: 150,
    },

    prestataireId: "prest_1",
  },
];

export const facturesPrestataire = [
  {
    id: "fact_1",
    numero: "FAC-2025-001",
    demandeServiceId: "dem_1",
    dateEmission: "2025-10-20T18:00:00.000Z",
    montantTotal: 150,
    statut: "PAYEE",
  },
  {
    id: "fact_2",
    numero: "FAC-2025-002",
    demandeServiceId: "dem_3",
    dateEmission: "2025-10-18T17:00:00.000Z",
    montantTotal: 150,
    statut: "PAYEE",
  },
];

export const facturesAvecDetails = facturesPrestataire.map(facture => {
  const demande = demandesServicesPrestataire.find(
    d => d.id === facture.demandeServiceId
  );

  return {
    ...facture,
    demandeService: demande,
    client: demande?.client,
    service: demande?.service
  };
});

export const paiementsPrestataire = [
  {
    id: "pay_1",
    factureId: "fact_1",
    montant: 150,
    modePaiement: "Mobile Money",
    datePaiement: "2025-10-20T18:10:00.000Z",
    statut: "CONFIRME",
  },
  {
    id: "pay_2",
    factureId: "fact_2",
    montant: 150,
    modePaiement: "Espèces",
    datePaiement: "2025-10-18T17:15:00.000Z",
    statut: "CONFIRME",
  },
];


export const paiementsAvecDetails = paiementsPrestataire.map(paiement => {
  const facture = facturesPrestataire.find(
    f => f.id === paiement.factureId
  );

  const demande = demandesServicesPrestataire.find(
    d => d.id === facture?.demandeServiceId
  );

  return {
    ...paiement,
    facture,
    demandeService: demande,
    client: demande?.client,
    service: demande?.service
  };
});


export const notificationsPrestataire = [
  {
    id: "notif_1",
    type: "DEMANDE",
    message: "Nouvelle demande de service de Ibrahima Camara",
    dateEnvoi: "2025-10-21T09:00:00.000Z",
  },
  {
    id: "notif_2",
    type: "PAIEMENT",
    message: "Paiement reçu pour la facture FAC-2025-001",
    dateEnvoi: "2025-10-20T18:11:00.000Z",
  },
];
export const logoImg  = [
  {
    src: "./logo2.png",
  },
];