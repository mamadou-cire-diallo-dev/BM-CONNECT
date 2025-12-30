import { prisma } from "../../db/prisma.js";

export const offersService = {
  async getAll(filters = {}) {
    const { categoryId, prestataireId, search } = filters;
    const where = {};

    if (categoryId) where.categorieId = categoryId;
    if (prestataireId) where.prestataireId = prestataireId;
    if (search) {
      where.OR = [
        { titre: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.serviceOffre.findMany({
      where,
      include: {
        categorie: { select: { nom: true } },
        prestataire: {
          include: {
            utilisateur: { select: { nomComplet: true } }
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id) {
    return prisma.serviceOffre.findUnique({
      where: { id },
      include: {
        categorie: true,
        prestataire: {
          include: {
            utilisateur: { select: { nomComplet: true, email: true } }
          }
        }
      },
    });
  },

  async create(prestataireId, data) {
    return prisma.serviceOffre.create({
      data: {
        ...data,
        prestataireId,
      },
    });
  },

  async update(id, prestataireId, data) {
    // Ensure ownership
    const offer = await prisma.serviceOffre.findUnique({
      where: { id },
      select: { prestataireId: true },
    });

    if (!offer || offer.prestataireId !== prestataireId) {
      throw new Error("Forbidden: You don't own this offer");
    }

    return prisma.serviceOffre.update({
      where: { id },
      data,
    });
  },

  async delete(id, prestataireId) {
    // Ensure ownership
    const offer = await prisma.serviceOffre.findUnique({
      where: { id },
      select: { prestataireId: true },
    });

    if (!offer || (prestataireId && offer.prestataireId !== prestataireId)) {
        // Only check ownership if prestataireId is provided (admins might delete too)
      throw new Error("Forbidden: You don't own this offer");
    }

    return prisma.serviceOffre.delete({
      where: { id },
    });
  },
};
