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
  logoutSchema,
} from "./auth.schemas.js";

const router = Router();

router.post(
  "/register",
  validate({ body: registerSchema }),
  authControllers.register
);

router.post(
  "/verify",
  validate({ body: verifySchema }),
  authControllers.verify
);
router.post(
  "/resend",
  validate({ body: resendSchema }),
  authControllers.resend
);

router.post("/login", validate({ body: loginSchema }), authControllers.login);
router.post(
  "/login/2fa/verify",
  validate({ body: verify2faSchema }),
  authControllers.verify2fa
);

router.post("/logout-device", requireAuth, authControllers.logoutDevice);
router.get("/devices", requireAuth, authControllers.devices);
router.delete(
  "/devices/:id",
  requireAuth,
  validate({ params: deviceIdParamSchema }),
  authControllers.deleteDevice
);

router.delete("/devices", requireAuth, authControllers.deleteAllDevices);

router.post("/refresh", authControllers.refresh);
router.post("/logout", validate({ body: logoutSchema }), authControllers.logout);

router.get("/me", requireAuth, authControllers.me);

export default router;
