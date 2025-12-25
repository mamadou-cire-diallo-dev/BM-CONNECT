import { prisma } from "../../db/prisma.js";

// créer une catégorie
export const createCategorie = async (data) => {
  return await prisma.categorieService.create({
    data: {
      nom: data.nom,
      description: data.description,
      // actif: data.actif ?? true,
    },
  });
};

// récupérer toutes les catégories
export const getAllCategories = async () => {
  return await prisma.categorieService.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
};

// récupérer une catégorie par ID
// export const getOneCategorie = async (id) => {
//   return await prisma.categorieService.findUnique({
//     where: { id },
//   });
// };

// mettre à jour une catégorie
export const updateCategorie = async (id, data) => {
  return await prisma.categorieService.update({
    where: { id },
    data: {
      nom: data.nom,
      description: data.description
    },
  });
};

// supprimer une catégorie: verifier d'abor quelle na pas un service offert
export const deleteCategorie = async (id) => {
  const offresActives = await prisma.serviceOffre.count({
    where: {
      categorieId: id,
      deletedAt: null,
    },
  });

  if (offresActives > 0) {
    throw new Error(
      "Impossible de supprimer la catégorie : des offres actives existent"
    );
  }

  return prisma.categorieService.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};

