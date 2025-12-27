import {
  createDemandeService,
  getAllDemandes,
  getDemandeById,
  getDemandesByClientId,
  getDemandesByPrestataireId,
  getDemandesByStatut,
  updateDemandeService,
  deleteDemandeService,
} from "./demandeService.services.js";

import { 
    createDemandeSchema, 
    updateDemandeSchema,
    demandeIdSchema
} from "./demandeService.schemas.js";

export const createDemandeController = async (req, res) => {
  try {
    const { error, value } = createDemandeSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: "Données invalides", errors: error.details });

    const demande = await createDemandeService(value);
    res.status(201).json({ message: "Demande créée", data: demande });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création", error: err.message });
  }
};

export const getAllDemandesController = async (req, res) => {
  try {
    const demandes = await getAllDemandes();
    res.status(200).json({ data: demandes });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

export const getDemandeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = demandeIdSchema.validate({ id });
    if (error) return res.status(400).json({ message: "ID invalide", errors: error.details });

    const demande = await getDemandeById(value.id);
    if (!demande) return res.status(404).json({ message: "Demande introuvable" });
    res.status(200).json({ data: demande });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

export const getDemandesByClientIdController = async (req, res) => {
  try {

    const { clientId } = req.params;

    const { error, value } = demandeIdSchema.validate({ id: clientId });
    if (error) return res.status(400).json({ message: "ID invalide", errors: error.details });

    const demandes = await getDemandesByClientId(value.id);
    res.status(200).json({ data: demandes });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
    }
};

export const getDemandesByPrestataireIdController = async (req, res) => {
  try {
    const { prestataireId } = req.params;

    const { error, value } = demandeIdSchema.validate({ id: prestataireId });
    if (error) return res.status(400).json({ message: "ID invalide", errors: error.details });

    const demandes = await getDemandesByPrestataireId(value.id);
    res.status(200).json({ data: demandes });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
    }
};

export const getDemandesByStatutController = async (req, res) => {
  try {
    const { statut } = req.params;
    const demandes = await getDemandesByStatut(statut);
    res.status(200).json({ data: demandes });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  } 
};



export const updateDemandeController = async (req, res) => {
  try {
    const { id } = req.params;

    const { error: idError } = demandeIdSchema.validate({ id });
    if (idError) return res.status(400).json({ message: "ID invalide", errors: idError.details });

    const { error, value } = updateDemandeSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: "Données invalides", errors: error.details });

    const demande = await updateDemandeService(id, value, req.user?.role || "CLIENT");
    res.status(200).json({ message: "Demande mise à jour", data: demande });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

export const deleteDemandeController = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = demandeIdSchema.validate({ id });
    if (error) return res.status(400).json({ message: "ID invalide", errors: error.details });

    // Supposons que req.user.role contient le rôle de l'utilisateur connecté
    // const userRole = req.user?.role;
    const userRole = "ADMINISTRATEUR"

    await deleteDemandeService(id, userRole);
    res.json({ message: "Demande supprimée" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

