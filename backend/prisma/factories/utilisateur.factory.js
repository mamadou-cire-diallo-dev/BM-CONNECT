import { faker } from "@faker-js/faker";
import { hashPassword } from "../../src/utils/password.js"; 
export async function buildUtilisateur(role, overrides = {}) {
  const motDePasseHash = await hashPassword(overrides.motDePasse ?? "Password123!");

  const base = {
    nomComplet: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    telephone: faker.phone.number("6########"),
    motDePasseHash,
    role,
    status: "ACTIVE",
    emailVerifiedAt: new Date(),
    phoneVerifiedAt: new Date(),
    photoProfil: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
    ...overrides,
  };

  // champs "métier" à ne pas laisser incohérents
  delete base.motDePasse;
  return base;
}

export function buildActor(role, userId, overrides = {}) {
  if (role === "CLIENT") {
    return { model: "client", data: { id: userId, adresse: faker.location.streetAddress(), type: "PARTICULIER", ...overrides } };
  }
  if (role === "PRESTATAIRE") {
    return { model: "prestataire", data: { id: userId, tarifHoraire: String(faker.number.int({ min: 30000, max: 200000 })), ...overrides } };
  }
  if (role === "VENDEUR") {
    return { model: "vendeur", data: { id: userId, nomBoutique: faker.company.name(), adresse: faker.location.streetAddress() } };
  }
  if (role === "ADMINISTRATEUR") {
    return { model: "administrateur", data: { id: userId } };
  }
  return null;
}
