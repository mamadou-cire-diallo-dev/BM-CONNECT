import { Router } from "express";
import categorieServiceRoutes from "../modules/categorieService/categorieService.routers.js";

const router = Router();

router.use("/serviceCategory", categorieServiceRoutes);

export default router;
