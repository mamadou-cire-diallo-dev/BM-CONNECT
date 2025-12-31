import Joi from "joi";

export const verifyAccountSchema = Joi.object({
  status: Joi.string()
    .valid("APPROVED", "REJECTED", "PENDING_REVIEW", "PENDING_DOCS")
    .required(),
  notes: Joi.string().trim().max(1000).allow(null, ""),
});
