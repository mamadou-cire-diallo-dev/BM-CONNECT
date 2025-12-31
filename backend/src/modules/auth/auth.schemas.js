import Joi from "joi";

const clientActorSchema = Joi.object({
  type: Joi.string().valid("PARTICULIER", "PME", "ADMINISTRATION").required(),
  adresse: Joi.string().min(3).max(255).required(),
  nif: Joi.string().max(50).allow(null, "").optional(),
  siege: Joi.string().max(255).allow(null, "").optional(),
});

const prestataireActorSchema = Joi.object({
  tarifHoraire: Joi.number().positive().required(),
});

const vendeurActorSchema = Joi.object({
  nomBoutique: Joi.string().min(2).max(120).required(),
  adresse: Joi.string().min(3).max(255).required(),
});

export const registerSchema = Joi.object({
  nomComplet: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  telephone: Joi.string().min(6).max(20).required(),
  motDePasse: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid("CLIENT", "PRESTATAIRE", "VENDEUR").required(),
  actor: Joi.when("role", {
    switch: [
      { is: "CLIENT", then: clientActorSchema.required() },
      { is: "PRESTATAIRE", then: prestataireActorSchema.required() },
      { is: "VENDEUR", then: vendeurActorSchema.required() },
    ],
    otherwise: Joi.forbidden(),
  }),
});

export const loginSchema = Joi.object({
  identifier: Joi.string().min(3).required(),
  motDePasse: Joi.string().min(6).required(),
});

export const verifySchema = Joi.object({
  type: Joi.string().valid("EMAIL", "PHONE").required(),
  identifier: Joi.alternatives().conditional("type", {
    is: "EMAIL",
    then: Joi.string().email().required(),
    otherwise: Joi.string().min(6).max(20).required(),
  }),
  code: Joi.string().length(6).required(),
});

export const resendSchema = Joi.object({
  type: Joi.string().valid("EMAIL", "PHONE").required(),
  identifier: Joi.alternatives().conditional("type", {
    is: "EMAIL",
    then: Joi.string().email().required(),
    otherwise: Joi.string().min(6).max(20).required(),
  }),
});

export const verify2faSchema = Joi.object({
  challengeId: Joi.string().uuid().required(),
  code: Joi.string().length(6).required(),
  rememberDevice: Joi.boolean().default(true),
});

export const deviceIdParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(6).required(),
  newPassword: Joi.string().min(6).max(100).required(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(6).max(100).required(),
  newPassword: Joi.string().min(6).max(100).required(),
});
