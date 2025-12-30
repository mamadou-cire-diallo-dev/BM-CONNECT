import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import * as authControllers from "./auth.controllers.js";
import {
  registerSchema,
  loginSchema,
  verifySchema,
  resendSchema,
  verify2faSchema,
  deviceIdParamSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "./auth.schemas.js";
import { requireCsrf, setCsrf } from "../../middlewares/csrf.js";
import rateLimit from "express-rate-limit";


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion de l'authentification et du compte utilisateur
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscrire un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nomComplet
 *               - email
 *               - telephone
 *               - motDePasse
 *               - role
 *             properties:
 *               nomComplet:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telephone:
 *                 type: string
 *               motDePasse:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [CLIENT, PRESTATAIRE, VENDEUR]
 *               actor:
 *                 type: object
 *                 description: Données spécifiques pour le rôle sélectionné
 *     responses:
 *       201:
 *         description: Utilisateur inscrit avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/register", validate({ body: registerSchema }), authControllers.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags: [Authentification]
 *     parameters:
 *       - $ref: '#/components/parameters/deviceIdHeader'
 *       - $ref: '#/components/parameters/deviceTokenHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - motDePasse
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email ou numéro de téléphone
 *               motDePasse:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Connexion réussie (retourne les tokens ou demande la 2FA)
 *       202:
 *         description: 2FA requise
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", loginLimiter, validate({ body: loginSchema }), authControllers.login);

/**
 * @swagger
 * /auth/login/2fa/verify:
 *   post:
 *     summary: Vérifier le code 2FA pendant la connexion
 *     tags: [Authentification]
 *     parameters:
 *       - $ref: '#/components/parameters/deviceIdHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - challengeId
 *               - code
 *             properties:
 *               challengeId:
 *                 type: string
 *               code:
 *                 type: string
 *               rememberDevice:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Connexion réussie (retourne deviceToken si rememberDevice=true)
 *       401:
 *         description: Code invalide
 */
router.post("/login/2fa/verify", otpLimiter, validate({ body: verify2faSchema }), authControllers.verify2fa);

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Vérifier le contact (email/téléphone)
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - identifier
 *               - code
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [EMAIL, PHONE]
 *               identifier:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact vérifié
 *       400:
 *         description: Code invalide
 */
router.post("/verify", otpLimiter, validate({ body: verifySchema }), authControllers.verify);

/**
 * @swagger
 * /auth/resend:
 *   post:
 *     summary: Renvoyer le code de vérification
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - identifier
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [EMAIL, PHONE]
 *               identifier:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code envoyé
 */
router.post("/resend", otpLimiter, validate({ body: resendSchema }), authControllers.resend);

/**
 * @swagger
 * /auth/password/forgot:
 *   post:
 *     summary: Demander la réinitialisation du mot de passe
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Code de réinitialisation envoyé
 */
router.post("/password/forgot", otpLimiter, validate({ body: forgotPasswordSchema }), authControllers.forgotPassword);

/**
 * @swagger
 * /auth/password/reset:
 *   post:
 *     summary: Reset password with code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post("/password/reset", otpLimiter, validate({ body: resetPasswordSchema }), authControllers.resetPassword);

// Cookie-based refresh/logout (CSRF required)
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Rafraîchir le token d'accès
 *     tags: [Authentification]
 *     security:
 *       - cookieAuth: []
 *       - csrfToken: []
 *     responses:
 *       200:
 *         description: Token rafraîchi
 *       401:
 *         description: Refresh token valide requis
 */
router.post("/refresh", requireCsrf, authControllers.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnexion de la session actuelle
 *     tags: [Authentification]
 *     security:
 *       - csrfToken: []
 *     responses:
 *       200:
 *         description: Déconnecté avec succès
 */
router.post("/logout", requireCsrf, authControllers.logout);

/**
 * @swagger
 * /auth/logout-all:
 *   post:
 *     summary: Logout all sessions
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     responses:
 *       200:
 *         description: Logged out from all devices
 */
router.post("/logout-all", requireCsrf, requireAuth, authControllers.logoutAll);

// Protected
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtenir le profil de l'utilisateur actuel
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur
 */
router.get("/me", requireAuth, authControllers.me);

/**
 * @swagger
 * /auth/devices:
 *   get:
 *     summary: List trusted devices
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of devices
 */
router.get("/devices", requireAuth, authControllers.devices);

/**
 * @swagger
 * /auth/logout-device:
 *   post:
 *     summary: Logout current device (explicitly)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Device logged out
 */
router.post("/logout-device", requireAuth, authControllers.logoutDevice);

/**
 * @swagger
 * /auth/devices/{id}:
 *   delete:
 *     summary: Remove a trusted device
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device removed
 */
router.delete("/devices/:id", requireAuth, validate({ params: deviceIdParamSchema }), authControllers.deleteDevice);

/**
 * @swagger
 * /auth/devices:
 *   delete:
 *     summary: Remove all other trusted devices
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All other devices removed
 */
router.delete("/devices", requireAuth, authControllers.deleteAllDevices);

/**
 * @swagger
 * /auth/password/change:
 *   post:
 *     summary: Change password (authenticated)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password changed
 */
router.post("/password/change", requireAuth, otpLimiter, validate({ body: changePasswordSchema }), authControllers.changePassword);

/**
 * @swagger
 * /auth/csrf:
 *   get:
 *     summary: Get a new CSRF token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: CSRF token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 csrfToken:
 *                   type: string
 */
router.get("/csrf", (req, res) => {
  const token = setCsrf(res);
  // Optionnel: renvoyer aussi le token (utile pour Insomnia)
  return res.json({ csrfToken: token });
});

export default router;
