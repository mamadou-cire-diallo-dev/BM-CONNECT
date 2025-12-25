import Joi from "joi";

/**
 * Création d'une catégorie
 */
export const createCategorieSchema = Joi.object({
  nom: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().allow(null, "")
});

/**
 * Mise à jour d'une catégorie
 * → aucun champ obligatoire
 */
export const updateCategorieSchema = Joi.object({
  nom: Joi.string().trim().min(3).max(100),
  description: Joi.string().trim().allow(null, "")
}).min(1); // au moins un champ à mettre à jour

/**
 * Validation de l'ID UUID
 */
export const categorieIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
