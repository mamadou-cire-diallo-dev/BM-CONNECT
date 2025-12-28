import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import * as authControllers from "./auth.controllers.js";
import { registerSchema, loginSchema } from "./auth.schemas.js";

const router = Router();

router.post("/register", validate({ body: registerSchema }), authControllers.register);
router.post("/login", validate({ body: loginSchema }), authControllers.login);
router.get("/me", requireAuth, authControllers.me);

export default router;
