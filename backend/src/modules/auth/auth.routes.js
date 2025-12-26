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
import { requireCsrf } from "../../middlewares/csrf.js";
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

// Public
router.post("/register", validate({ body: registerSchema }), authControllers.register);

router.post("/login", loginLimiter, validate({ body: loginSchema }), authControllers.login);
router.post("/login/2fa/verify", otpLimiter, validate({ body: verify2faSchema }), authControllers.verify2fa);

router.post("/verify", otpLimiter, validate({ body: verifySchema }), authControllers.verify);
router.post("/resend", otpLimiter, validate({ body: resendSchema }), authControllers.resend);

router.post("/password/forgot", otpLimiter, validate({ body: forgotPasswordSchema }), authControllers.forgotPassword);
router.post("/password/reset", otpLimiter, validate({ body: resetPasswordSchema }), authControllers.resetPassword);

// Cookie-based refresh/logout (CSRF required)
router.post("/refresh", requireCsrf, authControllers.refresh);
router.post("/logout", requireCsrf, authControllers.logout);
router.post("/logout-all", requireCsrf, requireAuth, authControllers.logoutAll);

// Protected
router.get("/me", requireAuth, authControllers.me);

router.get("/devices", requireAuth, authControllers.devices);
router.post("/logout-device", requireAuth, authControllers.logoutDevice);
router.delete("/devices/:id", requireAuth, validate({ params: deviceIdParamSchema }), authControllers.deleteDevice);
router.delete("/devices", requireAuth, authControllers.deleteAllDevices);

router.post("/password/change", requireAuth, otpLimiter, validate({ body: changePasswordSchema }), authControllers.changePassword);

// csrf 
router.get("/csrf", (req, res) => {
  const token = setCsrf(res);
  // Optionnel: renvoyer aussi le token (utile pour Insomnia)
  return res.json({ csrfToken: token });
});

export default router;
