import express from "express";
import {
  createDemandeController,
  getAllDemandesController,
  getDemandeByIdController,
  getDemandesByClientIdController,
  getDemandesByPrestataireIdController,
  getDemandesByStatutController,
  updateDemandeController,
  deleteDemandeController,
} from "./demandeService.controllers.js";

const router = express.Router();

router.post("/", createDemandeController);
router.get("/", getAllDemandesController);
router.get("/:id", getDemandeByIdController);
router.get("/client/:clientId", getDemandesByClientIdController);
router.get("/prestataire/:prestataireId", getDemandesByPrestataireIdController);
router.get("/statut/:statut", getDemandesByStatutController);
router.put("/:id", updateDemandeController);
router.delete("/:id", deleteDemandeController);

export default router;
