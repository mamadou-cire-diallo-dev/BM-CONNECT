import { prisma } from "../../db/prisma.js";

// créer une offre
export const createServiceOffre = async (data) => {
  return await prisma.serviceOffre.create({
    data,
  });
};


/**
 * Récupérer toutes les offres d'un prestataire
*/
export const getAllServiceOffresForPrestataire = async (prestataireId) => {
  return await prisma.serviceOffre.findMany({
    where: {
      prestataireId,
      deletedAt: null, // ne récupérer que les offres actives
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categorie: {
        where: { deletedAt: null },
      },
    },
  });
};


/**
 * Récupérer une seule offre d'un prestataire
 */
export const getOneServiceOffreForPrestataire = async (id, prestataireId) => {
  return await prisma.serviceOffre.findFirst({
    where: {
      id,
      prestataireId,
      deletedAt: null,
    },
    include: {
      categorie: {
        where: { deletedAt: null },
      },
    },
  });
};

// mettre à jour une offre
export const updateServiceOffre = async (id, data) => {
  return await prisma.serviceOffre.update({
    where: { id },
    data,
  });
};

// supprimer une offre
export const deleteServiceOffre = async (id) => {
  return await prisma.serviceOffre.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};
