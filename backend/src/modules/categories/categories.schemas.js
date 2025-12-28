import Joi from "joi";

export const createCategorySchema = Joi.object({
  nom: Joi.string().trim().min(2).max(50).required(),
  description: Joi.string().trim().max(500).allow(null, ""),
  actif: Joi.boolean().default(true),
});

export const updateCategorySchema = Joi.object({
  nom: Joi.string().trim().min(2).max(50),
  description: Joi.string().trim().max(500).allow(null, ""),
  actif: Joi.boolean(),
}).min(1);
