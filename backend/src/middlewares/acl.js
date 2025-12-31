export const ACL = {
    offre: {
      create: ["PRESTATAIRE"],
      update: ["PRESTATAIRE"],
      delete: ["PRESTATAIRE"],
      list: ["CLIENT", "PRESTATAIRE", "ADMINISTRATEUR"],
    },
    produit: {
      create: ["VENDEUR"],
      update: ["VENDEUR"],
      delete: ["VENDEUR"],
      list: ["CLIENT", "VENDEUR", "ADMINISTRATEUR"],
    },
    demande: {
      create: ["CLIENT"],
      read: ["CLIENT", "PRESTATAIRE", "ADMINISTRATEUR"],
      update: ["CLIENT", "PRESTATAIRE", "ADMINISTRATEUR"],
      cancel: ["CLIENT", "ADMINISTRATEUR"],
    },
    admin: {
      approvePrestataire: ["ADMINISTRATEUR"],
      rejectPrestataire: ["ADMINISTRATEUR"],
    },
  };
  