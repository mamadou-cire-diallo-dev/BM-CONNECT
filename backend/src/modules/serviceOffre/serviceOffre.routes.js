import express from "express";
import {
  createServiceOffreController,
  getAllMyServiceOffresController,
  getOneMyServiceOffreController,
  getAllServiceOffresController,
  updateServiceOffreController,
  deleteServiceOffreController,
} from "./serviceOffre.controllers.js";

const router = express.Router();

router.post("/", createServiceOffreController);
router.get("/all", getAllServiceOffresController);
router.get("/prestataire", getAllMyServiceOffresController);
router.get("/prestataire/:id", getOneMyServiceOffreController);
router.put("/:id", updateServiceOffreController);
router.delete("/:id", deleteServiceOffreController);

export default router;
