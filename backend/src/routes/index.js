import { Router } from "express";
import categorieServiceRoutes from "../modules/categorieService/categorieService.routers.js";
import serviceOffreRoutes from "../modules/serviceOffre/serviceOffre.routes.js";
import demandeServiceRoutes from "../modules/demandeService/demandeService.routes.js";

const router = Router();

router.use("/serviceCategory", categorieServiceRoutes);
router.use("/serviceOffres", serviceOffreRoutes);
router.use("/demandeServices", demandeServiceRoutes);

export default router;
