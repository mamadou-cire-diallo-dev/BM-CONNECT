import { prisma } from "../../db/prisma.js";

export const addressesService = {
  async create(clientId, data) {
    // Si c'est l'adresse principale, on retire l'ancien flag principal
    if (data.estPrincipal) {
      await prisma.adresse.updateMany({
        where: { clientId, estPrincipal: true },
        data: { estPrincipal: false },
      });
    }

    return prisma.adresse.create({
      data: {
        ...data,
        clientId,
      },
    });
  },

  async list(clientId) {
    return prisma.adresse.findMany({
      where: { clientId },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id, clientId) {
    return prisma.adresse.findFirst({
      where: { id, clientId },
    });
  },

  async update(id, clientId, data) {
    const address = await this.getById(id, clientId);
    if (!address) throw Object.assign(new Error("Adresse introuvable"), { status: 404 });

    if (data.estPrincipal) {
      await prisma.adresse.updateMany({
        where: { clientId, estPrincipal: true },
        data: { estPrincipal: false },
      });
    }

    return prisma.adresse.update({
      where: { id },
      data,
    });
  },

  async delete(id, clientId) {
    const address = await this.getById(id, clientId);
    if (!address) throw Object.assign(new Error("Adresse introuvable"), { status: 404 });

    return prisma.adresse.delete({
      where: { id },
    });
  }
};
