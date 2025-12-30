import { prisma } from "../../db/prisma.js";

export const invoicesService = {
  /**
   * Génère une facture pour une demande acceptée
   */
  async generateForRequest(demandeId) {
    const request = await prisma.demandeService.findUnique({
      where: { id: demandeId },
      include: { offre: true }
    });

    if (!request) throw new Error("Demande introuvable");

    // Génération du numéro de facture (ex: INV-2025-001)
    const year = new Date().getFullYear();
    const count = await prisma.facture.count({
      where: { createdAt: { gte: new Date(`${year}-01-01`) } }
    });
    const numero = `INV-${year}-${(count + 1).toString().padStart(3, '0')}`;

    return prisma.facture.create({
      data: {
        numero,
        montantTotal: request.offre.prix || 0,
        statut: "EN_ATTENTE",
        demandeId: request.id,
      },
    });
  },

  async getInvoiceByDemand(demandeId) {
    return prisma.facture.findUnique({
      where: { demandeId },
      include: { paiements: true }
    });
  }
};
