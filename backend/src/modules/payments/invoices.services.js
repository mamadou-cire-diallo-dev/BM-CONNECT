import { prisma } from "../../db/prisma.js";

export const invoicesService = {
  /**
   * Génère une facture d'Acompte (Diagnostic + Transport)
   */
  async generateAcompte(demandeId) {
    const request = await prisma.demandeService.findUnique({
      where: { id: demandeId },
      include: { offre: true }
    });

    if (!request) throw new Error("Demande introuvable");

    const montantAcompte = Number(request.offre.prixDiagnostic || 0) + Number(request.offre.fraisTransport || 0);
    const numero = await this._generateNumero();

    return prisma.facture.create({
      data: {
        numero,
        montantTotal: montantAcompte,
        statut: "EN_ATTENTE",
        type: "ACOMPTE",
        description: "Acompte : Diagnostic et Frais de transport",
        demandeId: request.id,
      },
    });
  },

  /**
   * Génère une facture de Solde (Prestation finale)
   */
  async generateSolde(demandeId, montantPrestationFinal) {
    const numero = await this._generateNumero();

    return prisma.facture.create({
      data: {
        numero,
        montantTotal: montantPrestationFinal,
        statut: "EN_ATTENTE",
        type: "SOLDE",
        description: "Solde : Prestation de service finale",
        demandeId,
      },
    });
  },

  async _generateNumero() {
    const year = new Date().getFullYear();
    const count = await prisma.facture.count({
      where: { numero: { startsWith: `INV-${year}` } }
    });
    return `INV-${year}-${(count + 1).toString().padStart(3, '0')}`;
  },

  async getInvoicesByDemand(demandeId) {
    return prisma.facture.findMany({
      where: { demandeId },
      include: { paiements: true },
      orderBy: { createdAt: 'asc' }
    });
  }
};
