import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.js";
import { requireCsrf } from "../../middlewares/csrf.js";
import * as paymentsControllers from "./payments.controllers.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Paiements
 *   description: Gestion des factures et des paiements
 */

/**
 * @swagger
 * /payments/invoice/{demandeId}:
 *   get:
 *     summary: Obtenir la facture d'une demande de service
 *     tags: [Paiements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: demandeId
 *         required: true
 *         description: ID de la demande de service
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Détails de la facture
 */
router.get("/invoice/:demandeId", requireAuth, paymentsControllers.getInvoice);

/**
 * @swagger
 * /payments/init:
 *   post:
 *     summary: Initialiser un paiement pour une facture
 *     tags: [Paiements]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - factureId
 *               - modePaye
 *             properties:
 *               factureId:
 *                 type: string
 *                 format: uuid
 *               modePaye:
 *                 type: string
 *                 example: ORANGE_MONEY
 *     responses:
 *       201:
 *         description: Paiement initialisé
 */
router.post("/init", requireAuth, requireCsrf, paymentsControllers.initPayment);

/**
 * @swagger
 * /payments/webhook-simulate:
 *   post:
 *     summary: Simuler un retour de paiement réussi (Webhook)
 *     tags: [Paiements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paiementId
 *               - referenceExterne
 *             properties:
 *               paiementId:
 *                 type: string
 *                 format: uuid
 *               referenceExterne:
 *                 type: string
 *                 example: REF-TEST-12345
 *     responses:
 *       200:
 *         description: Paiement confirmé
 */
router.post("/webhook-simulate", paymentsControllers.simulateWebhook);

export default router;
