import { prisma } from "../../db/prisma.js";

/**
 * Créer une demande
 */
export const createDemandeService = async (data) => {
  return await prisma.demandeService.create({ data });
};

/**
 * Récupérer toutes les demandes
 */
export const getAllDemandes = async () => {
  return await prisma.demandeService.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Récupérer une demande par id
 */
export const getDemandeById = async (id) => {
  return await prisma.demandeService.findUnique({ 
    where: { 
        id,
        deletedAt: null 
    } 
});
};

/**
 * Récupérer les demandes faite par un client
 */
export const getDemandesByClientId = async (clientId) => {
    return await prisma.demandeService.findMany({
        where: { clientId, deletedAt: null },
        orderBy: { createdAt: "desc" },
    });
}

/**
 * Récupérer les demandes reçue par un prestataire
 */
export const getDemandesByPrestataireId = async (prestataireId) => {
    return await prisma.demandeService.findMany({
        where: { prestataireId, deletedAt: null },
        orderBy: { createdAt: "desc" },
    });
}

/**
 * Récupérer les demandes par statut
 */
export const getDemandesByStatut = async (statut) => {
    return await prisma.demandeService.findMany({
        where: { statut, deletedAt: null },
        orderBy: { createdAt: "desc" },
    });
}

/**
 * Mettre à jour une demande avec workflow
 */
export const updateDemandeService = async (id, data, userRole = "CLIENT") => {
  const demande = await prisma.demandeService.findUnique({ where: { id } });
  if (!demande) throw new Error("Demande introuvable");

  // Gestion de l'annulation
  if (data.statut === "ANNULEE") {
    if (userRole === "CLIENT") {
      if (!["EN_ATTENTE", "ACOMPTE_EN_ATTENTE"].includes(demande.statut)) {
        throw new Error("Le client ne peut annuler que les demandes avant le début de la prestation");
      }
    }
  }

  // Transitions valides
  const validTransitions = {
    EN_ATTENTE: ["REFUSEE", "ACOMPTE_EN_ATTENTE", "ANNULEE"],
    REFUSEE: [],
    ACOMPTE_EN_ATTENTE: ["EN_COURS", "ANNULEE"],
    EN_COURS: ["FACTUREE", "ANNULEE"],
    FACTUREE: ["PAYEE"],
    PAYEE: [],
    ANNULEE: [],
  };

  if (data.statut && data.statut !== "ANNULEE") {
    if (!validTransitions[demande.statut].includes(data.statut)) {
      throw new Error(`Transition invalide: ${demande.statut} à ${data.statut}`);
    }
  }

  return await prisma.demandeService.update({
    where: { id },
    data,
  });
};

/**
 * Supprimer une demande
 */
export const deleteDemandeService = async (id, userRole) => {
  if (userRole !== "ADMINISTRATEUR") {
    throw new Error("Seul un administrateur peut supprimer une demande");
  }

  // Vérifie que la demande existe
  const demande = await prisma.demandeService.findUnique({ where: { id } });
  if (!demande) throw new Error("Demande introuvable");

  // Soft delete : on met juste deletedAt
  return await prisma.demandeService.delete({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

