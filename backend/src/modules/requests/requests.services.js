import { prisma } from "../../db/prisma.js";
import { invoicesService } from "../payments/invoices.services.js";

export const requestsService = {
  async createRequest(clientId, data) {
    let { offreId, dateSouhaitee, description, adresse, ville, adresseId } = data;

    // Si adresseId est fourni, on fait un "snapshot" de l'adresse
    if (adresseId) {
      const addr = await prisma.adresse.findUnique({ where: { id: adresseId, clientId } });
      if (addr) {
        adresse = addr.adresse;
        ville = addr.ville;
      }
    }

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
        adresse,
        ville,
        adresseId,
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
        factures: { include: { paiements: true } }
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
      
      if (newStatus === "ACCEPTED") {
        if (request.statut !== "PENDING") {
          throw Object.assign(new Error("Action impossible : la demande a déjà dépassé le stade de l'acceptation."), { status: 400 });
        }
        await invoicesService.generateAcompte(id);
        newStatus = "WAITING_ACOMPTE"; 
      } else if (newStatus === "REJECTED") {
        if (!["PENDING", "WAITING_ACOMPTE"].includes(request.statut)) {
          throw Object.assign(new Error("Impossible de rejeter une demande déjà validée ou terminée."), { status: 400 });
        }
      } else if (newStatus === "COMPLETED") {
        throw Object.assign(new Error("Le statut COMPLETED est géré automatiquement après le paiement du solde."), { status: 400 });
      }
    }

    return prisma.demandeService.update({
      where: { id },
      data: { statut: newStatus },
    });
  },

  /**
   * Le prestataire propose un prix final après diagnostic
   */
  async proposeFinalPrice(id, prestataireId, montantFinal) {
    const request = await prisma.demandeService.findUnique({
      where: { id },
      include: { factures: true }
    });

    if (!request) throw Object.assign(new Error("Demande introuvable"), { status: 404 });
    if (request.prestataireId !== prestataireId) throw Object.assign(new Error("Interdit"), { status: 403 });
    
    // Vérifier que l'acompte est payé
    const acompte = request.factures.find(f => f.type === "ACOMPTE");
    if (!acompte || acompte.statut !== "PAYEE") {
      throw Object.assign(new Error("L'acompte doit être payé avant de proposer un prix final"), { status: 400 });
    }

    // Générer la facture de solde
    await invoicesService.generateSolde(id, montantFinal);

    // Mettre à jour le statut de la demande
    return prisma.demandeService.update({
      where: { id },
      data: { statut: "WAITING_SOLDE" }
    });
  }
};
