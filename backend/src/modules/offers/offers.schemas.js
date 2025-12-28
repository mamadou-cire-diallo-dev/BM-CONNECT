import Joi from "joi";

export const createOfferSchema = Joi.object({
  titre: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().max(1000).allow(null, ""),
  tempsEstime: Joi.number().integer().min(1).allow(null),
  prix: Joi.number().precision(2).min(0).allow(null),
  categorieId: Joi.string().uuid().required(),
});

export const updateOfferSchema = Joi.object({
  titre: Joi.string().trim().min(3).max(100),
  description: Joi.string().trim().max(1000).allow(null, ""),
  tempsEstime: Joi.number().integer().min(1).allow(null),
  prix: Joi.number().precision(2).min(0).allow(null),
  categorieId: Joi.string().uuid(),
}).min(1);
