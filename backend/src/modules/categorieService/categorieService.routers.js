import express from "express";
import {
  createCategorieController,
  getAllCategoriesController,
  getOneCategorieController,
  updateCategorieController,
  deleteCategorieController,
} from "./categorieService.controller.js";

const router = express.Router();

router.post("/serviceCategory", createCategorieController);
router.get("/serviceCategory", getAllCategoriesController);
router.get("/serviceCategory/:id", getOneCategorieController);
router.put("/serviceCategory/:id", updateCategorieController);
router.delete("/serviceCategory/:id", deleteCategorieController);

export default router;
