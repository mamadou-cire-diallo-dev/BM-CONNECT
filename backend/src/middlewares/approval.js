import { prisma } from "../db/prisma.js";

export async function requirePrestataireApproved(req, res, next) {
  try {
    if (req.user?.role !== "PRESTATAIRE") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const p = await prisma.prestataire.findUnique({
      where: { id: req.user.sub },
      select: { verificationStatus: true },
    });

    if (!p) return res.status(403).json({ message: "Prestataire introuvable" });

    if (p.verificationStatus !== "APPROVED") {
      return res.status(403).json({ message: "Prestataire non approuvé" });
    }

    next();
  } catch (e) {
    next(e);
  }
}
