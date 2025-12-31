import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Middleware: vérifie le JWT "Bearer <token>"
 * - Si OK -> req.user = payload (ex: { sub: userId, role: "CLIENT" })
 * - Sinon -> 401
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Non authentifié (Authorization manquant)" });
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Non authentifié (format Bearer invalide)" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    // On attend au minimum { sub, role }
    if (!payload?.sub || !payload?.role) {
      return res.status(401).json({ message: "Token invalide (payload incomplet)" });
    }

    req.user = payload; // ex: { sub: "...uuid...", role: "CLIENT", iat, exp }
    next();
  } catch (err) {
    // Laisser errorMiddleware transformer en 401 "Token invalide ou expiré"
    next(err);
  }
}
