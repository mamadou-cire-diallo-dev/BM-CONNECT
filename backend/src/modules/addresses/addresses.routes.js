import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { requireCsrf } from "../../middlewares/csrf.js";
import * as addressesControllers from "./addresses.controllers.js";
import { createAddressSchema, updateAddressSchema } from "./addresses.schemas.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adresses
 *   description: Gestion des adresses des clients
 */

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Ajouter une nouvelle adresse
 *     tags: [Adresses]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titre, adresse, ville]
 *             properties:
 *               titre: { type: string }
 *               adresse: { type: string }
 *               ville: { type: string }
 *               indications: { type: string }
 *               estPrincipal: { type: boolean }
 *     responses:
 *       201:
 *         description: Adresse créée
 */
router.post(
  "/",
  requireAuth,
  requireRole("CLIENT"),
  requireCsrf,
  validate({ body: createAddressSchema }),
  addressesControllers.addAddress
);

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Obtenir mes adresses
 *     tags: [Adresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des adresses
 */
router.get("/", requireAuth, requireRole("CLIENT"), addressesControllers.getMyAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   patch:
 *     summary: Modifier une adresse
 *     tags: [Adresses]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAddressInput'
 *     responses:
 *       200:
 *         description: Adresse modifiée
 */
router.patch(
  "/:id",
  requireAuth,
  requireRole("CLIENT"),
  requireCsrf,
  validate({ body: updateAddressSchema }),
  addressesControllers.updateAddress
);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Supprimer une adresse
 *     tags: [Adresses]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       204:
 *         description: Supprimé
 */
router.delete("/:id", requireAuth, requireRole("CLIENT"), requireCsrf, addressesControllers.deleteAddress);

export default router;
