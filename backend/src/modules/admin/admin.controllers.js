import { adminService } from "./admin.services.js";

export async function getPendingPrestataires(req, res, next) {
  try {
    const list = await adminService.getPendingPrestataires();
    res.json(list);
  } catch (error) {
    next(error);
  }
}

export async function getPendingVendeurs(req, res, next) {
  try {
    const list = await adminService.getPendingVendeurs();
    res.json(list);
  } catch (error) {
    next(error);
  }
}

export async function verifyPrestataire(req, res, next) {
  try {
    const updated = await adminService.verifyPrestataire(req.params.id, req.body);
    res.json({ message: `Prestataire ${updated.verificationStatus.toLowerCase()}`, data: updated });
  } catch (error) {
    next(error);
  }
}

export async function verifyVendeur(req, res, next) {
  try {
    const updated = await adminService.verifyVendeur(req.params.id, req.body);
    res.json({ message: `Vendeur ${updated.verificationStatus.toLowerCase()}`, data: updated });
  } catch (error) {
    next(error);
  }
}
