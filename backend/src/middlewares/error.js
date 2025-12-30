export function errorMiddleware(err, req, res, next) {
    // Erreurs "custom" (si plus tard tu fais: throw Object.assign(new Error("msg"), { status: 401 }))
    const status = err.status || 500;
  
    // Prisma
    if (err?.code === "P2002") {
      return res.status(409).json({
        message: "Conflit: valeur déjà utilisée",
        meta: err.meta,
      });
    }
  
    // JWT
    if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token invalide ou expiré" });
    }
  
    console.error("Error:", err);
    return res.status(status).json({
      message: err.message || "Erreur serveur",
    });
  }
  