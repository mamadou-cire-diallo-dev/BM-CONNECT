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

export async function updateProfilePhoto(userId, photoUrl) {
  return prisma.utilisateur.update({
    where: { id: userId },
    data: { photoProfil: photoUrl },
    select: { id: true, photoProfil: true },
  });
}
