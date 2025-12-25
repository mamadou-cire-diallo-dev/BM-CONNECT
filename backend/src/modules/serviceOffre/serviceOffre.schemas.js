import Joi from "joi";

/**
 * Création d’une offre de service
 */
export const createServiceOffreSchema = Joi.object({
  titre: Joi.string().trim().min(3).max(150).required(),
  description: Joi.string().trim().allow(null, ""),
  tempsEstime: Joi.number().integer().positive().allow(null),
  prix: Joi.number().positive().precision(2).allow(null),

  prestataireId: Joi.string().uuid().required(),
  categorieId: Joi.string().uuid().required(),
});

/**
 * Mise à jour d’une offre
 */
export const updateServiceOffreSchema = Joi.object({
  titre: Joi.string().trim().min(3).max(150),
  description: Joi.string().trim().allow(null, ""),
  tempsEstime: Joi.number().integer().positive().allow(null),
  prix: Joi.number().positive().precision(2).allow(null),
  categorieId: Joi.string().uuid(),
}).min(1);

/**
 * Validation ID
 */
export const serviceOffreIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
