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
 *   name: Auth
 *   description: Authentication and gestion User
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
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
 *                 description: Specific data for the selected role
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", validate({ body: registerSchema }), authControllers.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
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
 *                 description: Email or phone number
 *               motDePasse:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful (returns tokens or 2FA requirement)
 *       202:
 *         description: 2FA required
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginLimiter, validate({ body: loginSchema }), authControllers.login);

/**
 * @swagger
 * /auth/login/2fa/verify:
 *   post:
 *     summary: Verify 2FA code during login
 *     tags: [Auth]
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
 *         description: Login successful (returns deviceToken if rememberDevice=true)
 *       401:
 *         description: Invalid code
 */
router.post("/login/2fa/verify", otpLimiter, validate({ body: verify2faSchema }), authControllers.verify2fa);

/**
 * @swagger
 * /auth/verify:
 *   post:
 *     summary: Verify contact (email/phone)
 *     tags: [Auth]
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
 *         description: Contact verified
 *       400:
 *         description: Invalid code
 */
router.post("/verify", otpLimiter, validate({ body: verifySchema }), authControllers.verify);

/**
 * @swagger
 * /auth/resend:
 *   post:
 *     summary: Resend verification code
 *     tags: [Auth]
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
 *         description: Code sent
 */
router.post("/resend", otpLimiter, validate({ body: resendSchema }), authControllers.resend);

/**
 * @swagger
 * /auth/password/forgot:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
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
 *         description: Reset code sent
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
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *       - csrfToken: []
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Valid refresh token required
 */
router.post("/refresh", requireCsrf, authControllers.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current session
 *     tags: [Auth]
 *     security:
 *       - csrfToken: []
 *     responses:
 *       200:
 *         description: Logged out
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
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
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
