export async function requirePrestataireApproved(req, res, next) {
    try {
      if (req.user.role !== "PRESTATAIRE") return next();
  
      const p = await prisma.prestataire.findUnique({
        where: { id: req.user.sub },
        select: { verificationStatus: true },
      });
  
      if (!p || p.verificationStatus !== "APPROVED") {
        return res.status(403).json({
          message: "Compte prestataire non vérifié. Accès limité.",
          code: "PRESTATAIRE_NOT_APPROVED",
          status: p?.verificationStatus ?? "UNKNOWN",
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  