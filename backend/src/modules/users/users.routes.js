import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import * as usersControllers from "./users.controllers.js";
import { updateMeSchema } from "./users.schemas.js";
import { requireCsrf } from "../../middlewares/csrf.js";

const router = Router();

router.patch("/me", requireAuth, validate({ body: updateMeSchema }), usersControllers.updateMe);

import { uploadProfilePhoto } from "../../middlewares/upload.js";

/**
 * @swagger
 * /users/profile-photo:
 *   patch:
 *     summary: Mettre à jour la photo de profil
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *       - csrfToken: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo mise à jour
 */
router.patch(
  "/profile-photo",
  requireAuth,
  requireCsrf,
  uploadProfilePhoto.single("photo"),
  usersControllers.updateProfilePhoto
);

export default router;
