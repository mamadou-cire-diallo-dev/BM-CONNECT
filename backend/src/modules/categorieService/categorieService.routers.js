import express from "express";
import {
  createCategorieController,
  getAllCategoriesController,
  getOneCategorieController,
  updateCategorieController,
  deleteCategorieController,
} from "./categorieService.controllers.js";

const router = express.Router();

router.post("/", createCategorieController);
router.get("/", getAllCategoriesController);
router.get("/:id", getOneCategorieController);
router.put("/:id", updateCategorieController);
router.delete("/:id", deleteCategorieController);

export default router;
