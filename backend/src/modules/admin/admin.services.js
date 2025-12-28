import { prisma } from "../../db/prisma.js";

export const adminService = {
  async getPendingPrestataires() {
    return prisma.prestataire.findMany({
      where: {
        verificationStatus: { not: "APPROVED" },
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            nomComplet: true,
            email: true,
            telephone: true,
            status: true,
          },
        },
        documents: true,
      },
    });
  },

  async getPendingVendeurs() {
    return prisma.vendeur.findMany({
      where: {
        verificationStatus: { not: "APPROVED" },
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            nomComplet: true,
            email: true,
            telephone: true,
            status: true,
          },
        },
      },
    });
  },

  async verifyPrestataire(id, { status }) {
    return prisma.prestataire.update({
      where: { id },
      data: {
        verificationStatus: status,
        // If approved, we might also want to set user status to ACTIVE if it was PENDING_CONTACT
        // But usually ACTIVE is for email/phone verification. 
        // Let's assume user.status is handled by auth verify.
      },
    });
  },

  async verifyVendeur(id, { status }) {
    return prisma.vendeur.update({
      where: { id },
      data: {
        verificationStatus: status,
      },
    });
  },
};
