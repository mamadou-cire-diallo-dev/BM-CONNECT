import { prisma } from "../db/prisma.js";

/**
 * Bloque si pas authentifié
 * (normalement ton requireAuth le fait déjà, ici on suppose req.user = { sub, role })
 */
export function requireUser(req, res, next) {
  if (!req.user?.sub) return res.status(401).json({ message: "Unauthorized" });
  next();
}

/** Autorise seulement certains rôles */
export function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

/** Compte pas suspendu (et option: doit être ACTIVE) */
export function requireAccountActive({ allowPendingContact = false } = {}) {
  return async (req, res, next) => {
    try {
      const userId = req.user?.sub;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const u = await prisma.utilisateur.findUnique({
        where: { id: userId },
        select: { status: true },
      });

      if (!u) return res.status(401).json({ message: "Unauthorized" });

      if (u.status === "SUSPENDED") {
        return res.status(403).json({ message: "Compte suspendu" });
      }

      if (!allowPendingContact && u.status !== "ACTIVE") {
        return res.status(403).json({ message: "Compte non actif" });
      }

      next();
    } catch (e) {
      next(e);
    }
  };
}
