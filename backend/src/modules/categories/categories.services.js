import { prisma } from "../../db/prisma.js";

export const categoriesService = {
  async getAll() {
    return prisma.categorieService.findMany({
      orderBy: { nom: "asc" },
    });
  },

  async getById(id) {
    return prisma.categorieService.findUnique({
      where: { id },
    });
  },

  async create(data) {
    return prisma.categorieService.create({
      data,
    });
  },

  async update(id, data) {
    return prisma.categorieService.update({
      where: { id },
      data,
    });
  },

  async delete(id) {
    // This will be intercepted by the softDelete extension and converted to an update
    return prisma.categorieService.delete({
      where: { id },
    });
  },
};
