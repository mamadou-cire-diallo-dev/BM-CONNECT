import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import * as usersControllers from "./users.controllers.js";
import { updateMeSchema } from "./users.schemas.js";

const router = Router();

router.patch("/me", requireAuth, validate({ body: updateMeSchema }), usersControllers.updateMe);

export default router;
