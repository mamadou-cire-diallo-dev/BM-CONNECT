import { prisma } from "../../db/prisma.js";

// créer une catégorie
export const createCategorie = async (data) => {
  return await prisma.categorieService.create({
    data: {
      nom: data.nom,
      description: data.description,
      actif: data.actif ?? true,
    },
  });
};

// récupérer toutes les catégories
export const getAllCategories = async () => {
  return await prisma.categorieService.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// récupérer une catégorie par ID
export const getOneCategorie = async (id) => {
  return await prisma.categorieService.findUnique({
    where: { id },
  });
};

// mettre à jour une catégorie
export const updateCategorie = async (id, data) => {
  return await prisma.categorieService.update({
    where: { id },
    data: {
      nom: data.nom,
      description: data.description,
      actif: data.actif,
    },
  });
};

// supprimer une catégorie
export const deleteCategorie = async (id) => {
  return await prisma.categorieService.delete({
    where: { id },
  });
};
