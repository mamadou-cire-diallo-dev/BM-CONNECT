import express from "express";
import {
  createServiceOffreController,
  getAllMyServiceOffresController,
  getOneMyServiceOffreController,
  updateServiceOffreController,
  deleteServiceOffreController,
} from "./serviceOffre.controllers.js";

const router = express.Router();

router.post("/", createServiceOffreController);
router.get("/", getAllMyServiceOffresController);
router.get("/:id", getOneMyServiceOffreController);
router.put("/:id", updateServiceOffreController);
router.delete("/:id", deleteServiceOffreController);

export default router;
