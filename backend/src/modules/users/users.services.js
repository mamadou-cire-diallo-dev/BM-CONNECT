import { prisma } from "../../db/prisma.js";

export async function updateMe(userId, data) {
  const payload = { ...data };
  if (payload.email === "") payload.email = null;

  return prisma.utilisateur.update({
    where: { id: userId },
    data: payload,
    select: { id: true, nomComplet: true, telephone: true, email: true, role: true },
  });
}
