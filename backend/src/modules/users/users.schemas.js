import Joi from "joi";

export const updateMeSchema = Joi.object({
  nomComplet: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().allow(null, "").optional(),
  telephone: Joi.string().min(6).max(20).optional(),
}).min(1);
