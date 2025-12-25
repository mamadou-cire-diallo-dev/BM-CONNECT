import { Router } from "express";
import categorieServiceRoutes from "../modules/categorieService/categorieService.routers.js";
import serviceOffreRoutes from "../modules/serviceOffre/serviceOffre.routes.js";

const router = Router();

router.use("/serviceCategory", categorieServiceRoutes);
router.use("/serviceOffres", serviceOffreRoutes);

export default router;
