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
 *   name: Offres
 *   description: Gestion des offres de services (Prestataires)
 */

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Obtenir toutes les offres de services issaga
 *     tags: [Offres]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         description: Filtrer par ID de catégorie
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: prestataireId
 *         description: Filtrer par ID de prestataire
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: search
 *         description: Recherche par mot-clé dans le titre ou la description
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des offres
 */
router.get("/", offersControllers.getOffers);

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Obtenir une offre par ID
 *     tags: [Offres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'offre
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Détails de l'offre
 *       404:
 *         description: Offre introuvable
 */
router.get("/:id", offersControllers.getOfferById);

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Créer une nouvelle offre (Prestataire uniquement)
 *     tags: [Offres]
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
 *         description: Offre créée
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
