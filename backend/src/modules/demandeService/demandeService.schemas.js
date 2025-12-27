import Joi from "joi";

export const createDemandeSchema = Joi.object({
  dateSouhaitee: Joi.date().required(),
  description: Joi.string().optional().allow("", null),
  acoumpt: Joi.number().precision(2).optional(),
  coutPrestation: Joi.number().precision(2).optional(),
  clientId: Joi.string().uuid().required(),
  prestataireId: Joi.string().uuid().required(),
  offreId: Joi.string().uuid().required(),
});

export const updateDemandeSchema = Joi.object({
  statut: Joi.string()
    .valid(
      "EN_ATTENTE",
      "ACOMPTE_EN_ATTENTE",
      "EN_COURS",
      "FACTUREE",
      "PAYEE",
      "ANNULEE",
      "REFUSEE"
    )
    .required(),
  description: Joi.string().optional().allow("", null),
  acoumpt: Joi.number().precision(2).optional(),
  coutPrestation: Joi.number().precision(2).optional(),
});


export const demandeIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
