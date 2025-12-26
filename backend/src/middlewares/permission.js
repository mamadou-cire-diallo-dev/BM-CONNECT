import { ACL } from "../policies/acl.js";
import { requireRole } from "./rbac.js";

export function requirePermission(resource, action) {
  const roles = ACL?.[resource]?.[action];
  if (!roles) {
    // si tu préfères: throw error
    return (req, res) => res.status(500).json({ message: "ACL action non définie" });
  }
  return requireRole(...roles);
}
