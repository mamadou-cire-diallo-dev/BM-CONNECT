import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole, requireAccountActive } from "../../middlewares/rbac.js";
import { requireCsrf } from "../../middlewares/csrf.js";
import * as offersControllers from "./offers.controllers.js";
import { createOfferSchema, updateOfferSchema } from "./offers.schemas.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Service offers management (Prestataires)
 */

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Get all service offers
 *     tags: [Offers]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: prestataireId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of offers
 */
router.get("/", offersControllers.getOffers);

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Get an offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Offer details
 *       404:
 *         description: Offer not found
 */
router.get("/:id", offersControllers.getOfferById);

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Create a new offer (Prestaire only)
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OfferInput'
 *     responses:
 *       201:
 *         description: Offer created
 */
router.post(
  "/",
  requireAuth,
  requireRole("PRESTATAIRE"),
  requireAccountActive({ allowPendingContact: false }),
  requireCsrf,
  validate({ body: createOfferSchema }),
  offersControllers.createOffer
);

/**
 * @swagger
 * /offers/{id}:
 *   patch:
 *     summary: Update an offer (Owner only)
 *     tags: [Offers]
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
 *             $ref: '#/components/schemas/OfferInput'
 *     responses:
 *       200:
 *         description: Offer updated
 */
router.patch(
  "/:id",
  requireAuth,
  requireRole("PRESTATAIRE"),
  requireCsrf,
  validate({ body: updateOfferSchema }),
  offersControllers.updateOffer
);

/**
 * @swagger
 * /offers/{id}:
 *   delete:
 *     summary: Delete an offer (Owner or Admin)
 *     tags: [Offers]
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
 *         description: Offer deleted
 */
router.delete(
  "/:id",
  requireAuth,
  requireRole("PRESTATAIRE", "ADMINISTRATEUR"),
  requireCsrf,
  offersControllers.deleteOffer
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     OfferInput:
 *       type: object
 *       required:
 *         - titre
 *         - categorieId
 *       properties:
 *         titre:
 *           type: string
 *         description:
 *           type: string
 *         tempsEstime:
 *           type: integer
 *         prix:
 *           type: number
 *         categorieId:
 *           type: string
 *           format: uuid
 */
