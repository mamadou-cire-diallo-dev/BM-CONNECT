import { prisma } from "../../db/prisma.js";
import { addMinutes } from "date-fns";

const BUFFER_MIN = 15;
const SEUIL_MIN = 120; // 2h


/**
 * Créer une demande de service tout en adaptant les crénos aux workflow
 */
export const createDemandeService = async (data) => {
  const {
    dateDebut,
    prestataireId,
    clientId,
    offreId,
    dureeInitialeMin = 120,
  } = data;

  const dateFin = addMinutes(new Date(dateDebut), dureeInitialeMin);

  // Vérifier conflits
  const conflit = await prisma.demandeService.findFirst({
    where: {
      prestataireId,
      deletedAt: null,
      AND: [
        { dateDebut: { lt: dateFin } },
        { dateFin: { gt: new Date(dateDebut) } },
      ],
    },
  });

  if (conflit) {
    throw new Error("Créneau indisponible pour ce prestataire");
  }

  return await prisma.demandeService.create({
    data: {
      ...data,
      dateFin,
      dureeEstimeeMin: dureeInitialeMin,
    },
  });
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

  /* ======================
     GESTION ANNULATION
  ====================== */
  if (data.statut === "ANNULEE") {
    if (userRole === "CLIENT") {
      if (!["EN_ATTENTE", "ACOMPTE_EN_ATTENTE"].includes(demande.statut)) {
        throw new Error(
          "Vous ne pouvez pas annuler cette prestation car elle est en cours"
        );
      }
    }
  }

  /* ======================
     WORKFLOW STATUT
  ====================== */
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
      throw new Error(
        `Transition invalide: ${demande.statut} → ${data.statut}`
      );
    }
  }

  let updateData = { ...data };

  /* ======================
    DIAGNOSTIC (CRÉNEAUX)
  ====================== */
  if (
    data.statut === "EN_COURS" &&
    data.dureeEstimeeMin &&
    userRole === "PRESTATAIRE"
  ) {
    // Nouvelle fin réelle après diagnostic
    const nouvelleFin = addMinutes(
      demande.dateDebut,
      data.dureeEstimeeMin
    );

    updateData.dateFin = nouvelleFin;

    // Calcul du dépassement réel
    const depassementMin =
      data.dureeEstimeeMin - demande.dureeInitialeMin;

    /**
     * CAS 1 : durée <= 2h → on ne touche PAS aux prestations suivantes
     */
    if (depassementMin <= 0) {
      return await prisma.demandeService.update({
        where: { id },
        data: updateData,
      });
    }

    /**
     * CAS 2 : durée > 2h → replanification automatique
     */
    const demandesSuivantes = await prisma.demandeService.findMany({
      where: {
        prestataireId: demande.prestataireId,
        deletedAt: null,
        statut: {
          notIn: ["ANNULEE", "REFUSEE"],
        },
        dateDebut: {
          gt: demande.dateDebut,
        },
      },
      orderBy: { dateDebut: "asc" },
    });

    let lastEnd = addMinutes(nouvelleFin, BUFFER_MIN);

    for (const d of demandesSuivantes) {
      const newStart = lastEnd;
      const newEnd = addMinutes(newStart, d.dureeEstimeeMin);

      await prisma.demandeService.update({
        where: { id: d.id },
        data: {
          dateDebut: newStart,
          dateFin: newEnd,
        },
      });

      lastEnd = addMinutes(newEnd, BUFFER_MIN);
    }
  }


  return await prisma.demandeService.update({
    where: { id },
    data: updateData,
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
  return await prisma.demandeService.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

