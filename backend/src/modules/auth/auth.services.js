import { prisma } from "../../db/prisma.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { signAccessToken } from "../../utils/jwt.js";

/**
 * Construit la création de l'acteur en fonction du role.
 * - id = userId (relation 1-1)
 * - actor = sous-objet contenant les champs essentiels selon le rôle
 */
function actorCreateData(role, userId, actor = {}) {
  switch (role) {
    case "CLIENT":
      return {
        model: "client",
        data: {
          id: userId,
          // Essentiels (selon ton choix)
          adresse: actor.adresse,          // ex: "Hamdallaye, Conakry"
          type: actor.type,                // ex: "PARTICULIER" | "PME" | "ADMINISTRATION"
          // Optionnels
          nif: actor.nif ?? null,
          siege: actor.siege ?? null,
        },
      };

    case "PRESTATAIRE":
      return {
        model: "prestataire",
        data: {
          id: userId,
          // Essentiel
          // Decimal: éviter les floats -> string est safe
          tarifHoraire: actor.tarifHoraire != null ? String(actor.tarifHoraire) : null,
          // noteMoyenne = null au début, disponible default true (dans Prisma)
        },
      };

    case "VENDEUR":
      return {
        model: "vendeur",
        data: {
          id: userId,
          // Essentiels
          nomBoutique: actor.nomBoutique,
          adresse: actor.adresse,
        },
      };

    default:
      return null;
  }
}

export async function register(payload) {
  const { nomComplet, email, telephone, motDePasse, role, actor } = payload;

  // sécurité: pas d’admin via register public
  if (role === "ADMINISTRATEUR") {
    throw Object.assign(new Error("Inscription admin interdite"), { status: 403 });
  }

  // (Sécurité soft) : si actor est manquant, on bloque.
  // Normalement Joi le garantit déjà, mais ça protège au cas où.
  if (!actor) {
    throw Object.assign(new Error("Le champ 'actor' est requis"), { status: 400 });
  }

  const motDePasseHash = await hashPassword(motDePasse);

  const result = await prisma.$transaction(async (tx) => {
    // 1) Créer Utilisateur
    const user = await tx.utilisateur.create({
      data: { nomComplet, email, telephone, motDePasseHash, role },
      select: {
        id: true,
        nomComplet: true,
        email: true,
        telephone: true,
        role: true,
        dateCreation: true,
        updatedAt: true,
      },
    });

    // 2) Créer l'acteur associé (avec champs essentiels)
    const actorInfo = actorCreateData(role, user.id, actor);

    let actorRow = null;
    if (actorInfo) {
      actorRow = await tx[actorInfo.model].create({
        data: actorInfo.data,
      });
    }

    // 3) Token
    const token = signAccessToken({ sub: user.id, role: user.role });

    return { user, actor: actorRow, token };
  });

  return result;
}

export async function login({ identifier, motDePasse }) {
  const user = await prisma.utilisateur.findFirst({
    where: { OR: [{ email: identifier }, { telephone: identifier }] },
  });

  if (!user) throw Object.assign(new Error("Identifiants invalides"), { status: 401 });

  const ok = await verifyPassword(motDePasse, user.motDePasseHash);
  if (!ok) throw Object.assign(new Error("Identifiants invalides"), { status: 401 });

  const token = signAccessToken({ sub: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      nomComplet: user.nomComplet,
      email: user.email,
      telephone: user.telephone,
      role: user.role,
    },
    token,
  };
}

export async function me(userId) {
  const user = await prisma.utilisateur.findUnique({
    where: { id: userId },
    select: {
      id: true,
      nomComplet: true,
      email: true,
      telephone: true,
      role: true,
      dateCreation: true,
      updatedAt: true,
      client: true,
      prestataire: true,
      vendeur: true,
      administrateur: true,
    },
  });

  if (!user) throw Object.assign(new Error("Utilisateur introuvable"), { status: 404 });

  // Retourner un profil unique “actor” selon role (plus simple côté front)
  let actor = null;
  if (user.role === "CLIENT") actor = user.client;
  if (user.role === "PRESTATAIRE") actor = user.prestataire;
  if (user.role === "VENDEUR") actor = user.vendeur;
  if (user.role === "ADMINISTRATEUR") actor = user.administrateur;

  return {
    user: { ...user, client: undefined, prestataire: undefined, vendeur: undefined, administrateur: undefined },
    actor,
  };
}
