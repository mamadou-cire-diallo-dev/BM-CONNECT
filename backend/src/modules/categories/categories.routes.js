import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { requireCsrf } from "../../middlewares/csrf.js";
import * as categoriesControllers from "./categories.controllers.js";
import { createCategorySchema, updateCategorySchema } from "./categories.schemas.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Catégories
 *   description: Gestion des catégories de services
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtenir toutes les catégories
 *     tags: [Catégories]
 *     responses:
 *       200:
 *         description: Liste des catégories
 */
router.get("/", categoriesControllers.getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtenir une catégorie par ID
 *     tags: [Catégories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Détails de la catégorie
 *       404:
 *         description: Catégorie introuvable
 */
router.get("/:id", categoriesControllers.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Créer une nouvelle catégorie (Admin uniquement)
 *     tags: [Catégories]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Catégorie créée
 */
router.post(
  "/",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  requireCsrf,
  validate({ body: createCategorySchema }),
  categoriesControllers.createCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update a category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Category updated
 */
router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  requireCsrf,
  validate({ body: updateCategorySchema }),
  categoriesControllers.updateCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Category deleted
 */
router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  requireCsrf,
  categoriesControllers.deleteCategory
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryInput:
 *       type: object
 *       required:
 *         - nom
 *       properties:
 *         nom:
 *           type: string
 *         description:
 *           type: string
 *         actif:
 *           type: boolean
 */
