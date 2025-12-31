import { randomToken } from "../utils/security.js";
import { env } from "../config/env.js";

const CSRF_COOKIE = "csrf_token";
const CSRF_HEADER = "x-csrf-token";

const COOKIE_OPTS = {
  httpOnly: false, // double-submit: le front doit lire
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/",
};

export function setCsrf(res, existingToken = null) {
  const token = existingToken || randomToken(16); // 32 chars hex if new
  res.cookie(CSRF_COOKIE, token, COOKIE_OPTS);
  return token;
}

export function clearCsrf(res) {
  res.clearCookie(CSRF_COOKIE, {
    ...COOKIE_OPTS,
    maxAge: 0,
  });
}

export function requireCsrf(req, res, next) {
  const cookieToken = req.cookies?.[CSRF_COOKIE];
  const headerToken = req.get(CSRF_HEADER);

  // Debug logging (remove in production)
  console.log("CSRF Debug:", {
    cookieToken: cookieToken ? cookieToken.substring(0, 8) + "..." : "MISSING",
    headerToken: headerToken ? headerToken.substring(0, 8) + "..." : "MISSING",
    match: cookieToken === headerToken
  });

  if (!cookieToken || !headerToken || String(cookieToken) !== String(headerToken)) {
    return res.status(403).json({ message: "CSRF token invalide" });
  }
  next();
}
