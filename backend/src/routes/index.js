import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import usersRoutes from "../modules/users/users.routes.js";
import categoriesRoutes from "../modules/categories/categories.routes.js";
import offersRoutes from "../modules/offers/offers.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "OK" }));

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/offers", offersRoutes);
router.use("/admin", adminRoutes);

export default router;
