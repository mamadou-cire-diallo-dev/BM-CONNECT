import Joi from "joi";

export const createAddressSchema = Joi.object({
  titre: Joi.string().trim().max(100).required(),
  adresse: Joi.string().trim().max(255).required(),
  ville: Joi.string().trim().max(100).required(),
  indications: Joi.string().trim().max(500).allow(null, ""),
  estPrincipal: Joi.boolean().default(false),
});

export const updateAddressSchema = Joi.object({
  titre: Joi.string().trim().max(100),
  adresse: Joi.string().trim().max(255),
  ville: Joi.string().trim().max(100),
  indications: Joi.string().trim().max(500).allow(null, ""),
  estPrincipal: Joi.boolean(),
});
