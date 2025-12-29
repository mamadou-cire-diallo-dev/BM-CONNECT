import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { requireCsrf } from "../../middlewares/csrf.js";
import * as adminControllers from "./admin.controllers.js";
import { verifyAccountSchema } from "./admin.schemas.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Administration
 *   description: Opérations administratives (Vérification de comptes, etc.)
 */

/**
 * @swagger
 * /admin/pending/prestataires:
 *   get:
 *     summary: Lister les prestataires en attente de vérification (Admin uniquement)
 *     tags: [Administration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des prestataires en attente
 */
router.get(
  "/pending/prestataires",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  adminControllers.getPendingPrestataires
);

/**
 * @swagger
 * /admin/pending/vendeurs:
 *   get:
 *     summary: Lister les vendeurs en attente de vérification (Admin uniquement)
 *     tags: [Administration]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des vendeurs en attente
 */
router.get(
  "/pending/vendeurs",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  adminControllers.getPendingVendeurs
);

/**
 * @swagger
 * /admin/verify/prestataire/{id}:
 *   patch:
 *     summary: Vérifier/Approuver un prestataire (Admin uniquement)
 *     tags: [Administration]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyAccountInput'
 *     responses:
 *       200:
 *         description: Statut de vérification mis à jour
 */
router.patch(
  "/verify/prestataire/:id",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  requireCsrf,
  validate({ body: verifyAccountSchema }),
  adminControllers.verifyPrestataire
);

/**
 * @swagger
 * /admin/verify/vendeur/{id}:
 *   patch:
 *     summary: Verify/Approve a vendeur (Admin only)
 *     tags: [Admin]
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyAccountInput'
 *     responses:
 *       200:
 *         description: Verification updated
 */
router.patch(
  "/verify/vendeur/:id",
  requireAuth,
  requireRole("ADMINISTRATEUR"),
  requireCsrf,
  validate({ body: verifyAccountSchema }),
  adminControllers.verifyVendeur
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     VerifyAccountInput:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [APPROVED, REJECTED, PENDING_REVIEW, PENDING_DOCS]
 *         notes:
 *           type: string
 */
