import {
  createServiceOffre,
  getAllServiceOffresForPrestataire,
  getOneServiceOffreForPrestataire,
  updateServiceOffre,
  deleteServiceOffre,
} from "./serviceOffre.services.js";

import {
  createServiceOffreSchema,
  updateServiceOffreSchema,
  serviceOffreIdSchema,
} from "./serviceOffre.schemas.js";

// créer une offre
export const createServiceOffreController = async (req, res) => {
  try {
    const { error, value } = createServiceOffreSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Données invalides",
        errors: error.details.map((d) => d.message),
      });
    }

    const offre = await createServiceOffre(value);

    res.status(201).json({
      message: "Offre de service créée avec succès",
      data: offre,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de l’offre",
      error: error.message,
    });
  }
};

/**
 * Afficher toutes les offres du prestataire
 */
export const getAllMyServiceOffresController = async (req, res) => {
  try {
    const prestataireId = req.user.id; // ID récupéré depuis JWT ou session
    const offres = await getAllServiceOffresForPrestataire(prestataireId);
    res.json({ message: "Mes offres de services", data: offres });
  } catch (error) {
    res.status(500).json({ 
        message: "Erreur lors de la récupération", 
        error: error.message 
    });
  }
};


/**
 * Rechercher une offre spécifique du prestataire
 */
export const getOneMyServiceOffreController = async (req, res) => {
  try {
    const prestataireId = req.user.id; // ID du prestataire connecté
    const { id } = req.params;
    const offre = await getOneServiceOffreForPrestataire(id, prestataireId);

    if (!offre) {
      return res.status(404).json({ message: "Offre introuvable ou non autorisée" });
    }

    res.json({ message: "Offre trouvée", data: offre });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
  }
};



// mettre à jour une offre
export const updateServiceOffreController = async (req, res) => {
  try {
    const { error: idError } = serviceOffreIdSchema.validate(req.params);
    if (idError) {
      return res.status(400).json({
        message: "ID invalide",
        errors: idError.details.map((d) => d.message),
      });
    }

    const { error, value } = updateServiceOffreSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Données invalides",
        errors: error.details.map((d) => d.message),
      });
    }

    const offre = await updateServiceOffre(req.params.id, value);

    res.status(200).json({
      message: "Offre mise à jour avec succès",
      data: offre,
    });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour de l’offre",
      error: error.message,
    });
  }
};

// supprimer une offre
export const deleteServiceOffreController = async (req, res) => {
  try {
    const { error } = serviceOffreIdSchema.validate(req.params);

    if (error) {
      return res.status(400).json({
        message: "ID invalide",
        errors: error.details.map((d) => d.message),
      });
    }

    await deleteServiceOffre(req.params.id);

    res.status(200).json({
      message: "Offre supprimée avec succès",
    });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la suppression de l’offre",
      error: error.message,
    });
  }
};
