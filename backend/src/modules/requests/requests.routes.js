import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole, requireAccountActive } from "../../middlewares/rbac.js";
import { requireCsrf } from "../../middlewares/csrf.js";
import * as requestsControllers from "./requests.controllers.js";
import { createRequestSchema, updateRequestStatusSchema } from "./requests.schemas.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Demandes
 *   description: Gestion des demandes de service
 */

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Créer une nouvelle demande de service (Client uniquement)
 *     tags: [Demandes]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRequestInput'
 *     responses:
 *       201:
 *         description: Request created
 */
router.post(
  "/",
  requireAuth,
  requireRole("CLIENT"),
  requireCsrf,
  validate({ body: createRequestSchema }),
  requestsControllers.createRequest
);

/**
 * @swagger
 * /requests/my:
 *   get:
 *     summary: Obtenir mes demandes de service (Client ou Prestataire)
 *     tags: [Demandes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des demandes
 */
router.get(
  "/my",
  requireAuth,
  requireRole("CLIENT", "PRESTATAIRE"),
  requestsControllers.getMyRequests
);

/**
 * @swagger
 * /requests/{id}:
 *   get:
 *     summary: Obtenir les détails d'une demande par ID
 *     tags: [Demandes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la demande (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Détails de la demande
 */
router.get(
  "/:id",
  requireAuth,
  requestsControllers.getRequestById
);

/**
 * @swagger
 * /requests/{id}/status:
 *   patch:
 *     summary: Mettre à jour le statut d'une demande (Accepter/Rejeter/Terminer/Annuler)
 *     tags: [Demandes]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la demande
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatusInput'
 *     responses:
 *       200:
 *         description: Statut mis à jour
 */
router.patch(
  "/:id/status",
  requireAuth,
  requireCsrf,
  validate({ body: updateRequestStatusSchema }),
  requestsControllers.updateRequestStatus
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRequestInput:
 *       type: object
 *       required:
 *         - offreId
 *       properties:
 *         offreId:
 *           type: string
 *           format: uuid
 *         dateSouhaitee:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *     UpdateStatusInput:
 *       type: object
 *       required:
 *         - statut
 *       properties:
 *         statut:
 *           type: string
 *           enum: [PENDING, ACCEPTED, REJECTED, COMPLETED, CANCELLED]
 *         notes:
 *           type: string
 */
