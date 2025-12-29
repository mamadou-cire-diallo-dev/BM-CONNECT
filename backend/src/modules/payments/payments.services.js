import { prisma } from "../../db/prisma.js";

export const paymentsService = {
  /**
   * Initialise un paiement pour une facture
   */
  async initializePayment(factureId, modePaye) {
    const facture = await prisma.facture.findUnique({
      where: { id: factureId },
      include: { demande: true }
    });

    if (!facture) throw new Error("Facture introuvable");
    if (facture.statut === "PAYEE") throw new Error("La facture est déjà payée");

    // Simulation de création de paiement
    return prisma.paiement.create({
      data: {
        factureId,
        montant: facture.montantTotal,
        modePaye,
        statut: "PENDING",
        provider: "SIMULATION",
        reference: `REFTX-${Date.now()}` // Simulation d'une référence transactionnelle
      }
    });
  },

  /**
   * Confirme un paiement (Simulation de webhook)
   */
  async confirmPayment(paiementId, referenceExterne) {
    const paiement = await prisma.paiement.findUnique({
      where: { id: paiementId },
      include: { facture: true }
    });

    if (!paiement) throw new Error("Paiement introuvable");

    return await prisma.$transaction(async (tx) => {
      // 1. Mettre à jour le paiement
      const updatedPaiement = await tx.paiement.update({
        where: { id: paiementId },
        data: {
          statut: "SUCCESS",
          reference: referenceExterne,
          datePaiement: new Date()
        }
      });

      // 2. Mettre à jour la facture
      await tx.facture.update({
        where: { id: paiement.factureId },
        data: { statut: "PAYEE" }
      });

      // 3. Mettre à jour le statut de la demande vers "CONFIRMED"
      await tx.demandeService.update({
        where: { id: paiement.facture.demandeId },
        data: { statut: "ACCEPTED" } // On garde ACCEPTED ou on ajoute CONFIRMED ? 
        // Note: Le CDC parle de CONFIRMER après paiement. 
        // Adaptons le schéma de statut dans requests.services si besoin.
      });

      return updatedPaiement;
    });
  }
};
