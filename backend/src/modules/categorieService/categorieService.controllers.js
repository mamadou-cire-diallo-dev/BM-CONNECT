import {
  createCategorie,
  getAllCategories,
  getOneCategorie,
  updateCategorie,
  deleteCategorie,
} from "./categorieService.services.js";

import {
  createCategorieSchema,
  updateCategorieSchema,
  categorieIdSchema,
} from "./categorieService.schemas.js";

/**
 * Créer une catégorie
 */
export const createCategorieController = async (req, res) => {
  try {
    const { error, value } = createCategorieSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Données invalides",
        errors: error.details.map((d) => d.message),
      });
    }

    const categorie = await createCategorie(value);

    res.status(201).json({
      message: "Catégorie créée avec succès",
      data: categorie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la catégorie",
      error: error.message,
    });
  }
};

/**
 * Récupérer toutes les catégories
 */
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des catégories",
      error: error.message,
    });
  }
};

/**
 * Récupérer une catégorie
 */
export const getOneCategorieController = async (req, res) => {
  try {
    const { error } = categorieIdSchema.validate(req.params);

    if (error) {
      return res.status(400).json({
        message: "ID invalide",
        errors: error.details.map((d) => d.message),
      });
    }

    const categorie = await getOneCategorie(req.params.id);

    if (!categorie) {
      return res.status(404).json({
        message: "Catégorie introuvable",
      });
    }

    res.status(200).json({ data: categorie });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la catégorie",
      error: error.message,
    });
  }
};

/**
 * Mettre à jour une catégorie
 */
export const updateCategorieController = async (req, res) => {
  try {
    // Validation ID
    const { error: idError } = categorieIdSchema.validate(req.params);
    if (idError) {
      return res.status(400).json({
        message: "ID invalide",
        errors: idError.details.map((d) => d.message),
      });
    }

    // Validation body
    const { error, value } = updateCategorieSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Données invalides",
        errors: error.details.map((d) => d.message),
      });
    }

    const categorie = await updateCategorie(req.params.id, value);

    res.status(200).json({
      message: "Catégorie mise à jour avec succès",
      data: categorie,
    });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour de la catégorie",
      error: error.message,
    });
  }
};

/**
 * Supprimer une catégorie
 */
export const deleteCategorieController = async (req, res) => {
  try {
    const { error } = categorieIdSchema.validate(req.params);

    if (error) {
      return res.status(400).json({
        message: "ID invalide",
        errors: error.details.map((d) => d.message),
      });
    }

    await deleteCategorie(req.params.id);

    res.status(200).json({
      message: "Catégorie supprimée avec succès",
    });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la suppression de la catégorie",
      error: error.message,
    });
  }
};
