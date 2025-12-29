import { prisma } from "../../db/prisma.js";
import { invoicesService } from "../payments/invoices.services.js";

export const requestsService = {
  async createRequest(clientId, data) {
    const { offreId, dateSouhaitee, description } = data;

    // Verify offer exists and get its prestataire
    const offer = await prisma.serviceOffre.findUnique({
      where: { id: offreId },
      select: { prestataireId: true, deletedAt: true },
    });

    if (!offer || offer.deletedAt) {
      throw Object.assign(new Error("Offre de service introuvable"), { status: 404 });
    }

    return prisma.demandeService.create({
      data: {
        clientId,
        prestataireId: offer.prestataireId,
        offreId,
        dateSouhaitee,
        description,
        statut: "PENDING",
      },
      include: {
        offre: { select: { titre: true } },
        prestataire: {
          include: {
            utilisateur: { select: { nomComplet: true } }
          }
        }
      }
    });
  },

  async getClientRequests(clientId) {
    return prisma.demandeService.findMany({
      where: { clientId },
      include: {
        offre: { select: { titre: true, prix: true } },
        prestataire: {
          include: {
            utilisateur: { select: { nomComplet: true } }
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getPrestataireRequests(prestataireId) {
    return prisma.demandeService.findMany({
      where: { prestataireId },
      include: {
        offre: { select: { titre: true, prix: true } },
        client: {
          include: {
            utilisateur: { select: { nomComplet: true, telephone: true } }
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getRequestById(id, userId, role) {
    const request = await prisma.demandeService.findUnique({
      where: { id },
      include: {
        offre: true,
        client: { include: { utilisateur: { select: { nomComplet: true, email: true } } } },
        prestataire: { include: { utilisateur: { select: { nomComplet: true, email: true } } } },
      }
    });

    if (!request) return null;

    // Security: Only client or prestataire involved can see details
    const isOwner = (role === "CLIENT" && request.clientId === userId) ||
                    (role === "PRESTATAIRE" && request.prestataireId === userId) ||
                    (role === "ADMINISTRATEUR");

    if (!isOwner) {
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    }

    return request;
  },

  async updateStatus(id, userId, role, newStatus) {
    const request = await prisma.demandeService.findUnique({
      where: { id },
      select: { clientId: true, prestataireId: true, statut: true }
    });

    if (!request) {
      throw Object.assign(new Error("Demande introuvable"), { status: 404 });
    }

    // Role-based status transitions
    if (role === "CLIENT") {
      if (request.clientId !== userId) throw Object.assign(new Error("Forbidden"), { status: 403 });
      if (newStatus !== "CANCELLED") throw Object.assign(new Error("Action non autorisée pour un client"), { status: 400 });
      if (request.statut !== "PENDING") throw Object.assign(new Error("Impossible d'annuler une demande déjà traitée"), { status: 400 });
    }

    if (role === "PRESTATAIRE") {
      if (request.prestataireId !== userId) throw Object.assign(new Error("Forbidden"), { status: 403 });
      const allowed = ["ACCEPTED", "REJECTED", "COMPLETED"];
      if (!allowed.includes(newStatus)) throw Object.assign(new Error("Action non autorisée pour un prestataire"), { status: 400 });
      
      if (newStatus === "COMPLETED" && request.statut !== "ACCEPTED") {
        throw Object.assign(new Error("Seule une demande acceptée peut être marquée comme terminée"), { status: 400 });
      }

      // Si le prestataire accepte, on génère la facture automatiquement
      if (newStatus === "ACCEPTED" && request.statut !== "ACCEPTED") {
        await invoicesService.generateForRequest(id);
      }
    }

    return prisma.demandeService.update({
      where: { id },
      data: { statut: newStatus },
    });
  }
};
