import Joi from "joi";

export const createRequestSchema = Joi.object({
  offreId: Joi.string().uuid().required(),
  dateSouhaitee: Joi.date().iso().greater("now").allow(null),
  description: Joi.string().trim().max(1000).allow(null, ""),
});

export const updateRequestStatusSchema = Joi.object({
  statut: Joi.string()
    .valid("PENDING", "ACCEPTED", "REJECTED", "COMPLETED", "CANCELLED")
    .required(),
  notes: Joi.string().trim().max(500).allow(null, ""),
});
