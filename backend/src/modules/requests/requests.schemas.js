import Joi from "joi";

export const createRequestSchema = Joi.object({
  offreId: Joi.string().uuid().required(),
  dateSouhaitee: Joi.date().iso().greater("now").allow(null),
  description: Joi.string().trim().max(1000).allow(null, ""),
  adresseId: Joi.string().uuid().allow(null),
  adresse: Joi.string().trim().max(255).when('adresseId', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  ville: Joi.string().trim().max(100).when('adresseId', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
});

export const updateRequestStatusSchema = Joi.object({
  statut: Joi.string()
    .valid("PENDING", "WAITING_ACOMPTE", "ACCEPTED", "WAITING_SOLDE", "COMPLETED", "REJECTED", "CANCELLED")
    .required(),
  notes: Joi.string().trim().max(500).allow(null, ""),
});
