import { prisma } from "../db/prisma.js";

export async function requireAccessToDemande(req, res, next) {
  try {
    const userId = req.user?.sub;
    const role = req.user?.role;
    const demandeId = req.params?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!demandeId) return res.status(400).json({ message: "Param id manquant" });

    if (role === "ADMINISTRATEUR") return next();

    const demande = await prisma.demandeService.findUnique({
      where: { id: demandeId },
      select: { clientId: true, prestataireId: true },
    });

    if (!demande) return res.status(404).json({ message: "Demande introuvable" });

    const ok =
      (role === "CLIENT" && demande.clientId === userId) ||
      (role === "PRESTATAIRE" && demande.prestataireId === userId);

    if (!ok) return res.status(403).json({ message: "Forbidden" });

    next();
  } catch (e) {
    next(e);
  }
}
