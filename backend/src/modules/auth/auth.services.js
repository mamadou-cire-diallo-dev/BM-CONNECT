import { prisma } from "../../db/prisma.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { signAccessToken } from "../../utils/jwt.js";
import { generateOtp6, hashOtp } from "../../utils/otp.js";
import { sendOtpEmail } from "../../utils/mailer.js";
import {
  sha256,
  randomToken,
  getClientIp,
  getUserAgent,
  getDeviceId,
  getDeviceToken,
} from "../../utils/security.js";

// ====== CONSTANTES ======
const OTP_TTL_MS = 10 * 60 * 1000; // 10 min
const TRUSTED_DEVICE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 jours
const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000; 

// ====== HELPERS PURPOSE ======
function contactPurpose(type) {
  if (type === "EMAIL") return "CONTACT_EMAIL";
  if (type === "PHONE") return "CONTACT_PHONE";
  return null;
}

// ====== TRUSTED DEVICE HELPERS ======
async function getTrustedDeviceForUser(userId, deviceId) {
  if (!deviceId) return null;

  return prisma.trustedDevice.findFirst({
    where: {
      userId,
      deviceId,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
  });
}

// MVP suspicion : UA différent => 2FA
function isSuspicious(trusted, req) {
  if (!trusted) return true; // device inconnu => suspicion (nouvel appareil)
  const ua = getUserAgent(req);
  if (!trusted.userAgent) return false;
  if (!ua) return false;
  return trusted.userAgent !== ua;
}

async function createLogin2faChallenge(tx, userId, channel, code) {
  // Optionnel mais propre : invalider anciens challenges non utilisés
  await tx.verificationCode.updateMany({
    where: { userId, purpose: "LOGIN_2FA", usedAt: null },
    data: { usedAt: new Date() },
  });

  const row = await tx.verificationCode.create({
    data: {
      userId,
      type: channel, // EMAIL | PHONE
      purpose: "LOGIN_2FA",
      codeHash: hashOtp(code),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
    },
    select: { id: true, type: true },
  });

  return row;
}

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
          adresse: actor.adresse,
          type: actor.type,
          nif: actor.nif ?? null,
          siege: actor.siege ?? null,
        },
      };

    case "PRESTATAIRE":
      return {
        model: "prestataire",
        data: {
          id: userId,
          tarifHoraire: actor.tarifHoraire != null ? String(actor.tarifHoraire) : null,
        },
      };

    case "VENDEUR":
      return {
        model: "vendeur",
        data: {
          id: userId,
          nomBoutique: actor.nomBoutique,
          adresse: actor.adresse,
        },
      };

    default:
      return null;
  }
}

/**
 * REGISTER
 * - crée user + actor
 * - crée OTP contact EMAIL + PHONE (purpose CONTACT_*)
 * - envoie OTP email par nodemailer
 * - log OTP phone en console (SMS plus tard)
 * - ne renvoie PAS de token
 */
export async function register(payload) {
  const { nomComplet, email, telephone, motDePasse, role, actor } = payload;

  if (role === "ADMINISTRATEUR") {
    throw Object.assign(new Error("Inscription admin interdite"), { status: 403 });
  }
  if (!actor) {
    throw Object.assign(new Error("Le champ 'actor' est requis"), { status: 400 });
  }

  const motDePasseHash = await hashPassword(motDePasse);

  const emailCode = generateOtp6();
  const phoneCode = generateOtp6();

  const created = await prisma.$transaction(async (tx) => {
    const user = await tx.utilisateur.create({
      data: { nomComplet, email, telephone, motDePasseHash, role },
      select: { id: true, email: true, telephone: true, role: true },
    });

    const actorInfo = actorCreateData(role, user.id, actor);
    if (!actorInfo) throw Object.assign(new Error("Role invalide"), { status: 400 });

    await tx[actorInfo.model].create({ data: actorInfo.data });

    await tx.verificationCode.createMany({
      data: [
        {
          userId: user.id,
          type: "EMAIL",
          purpose: "CONTACT_EMAIL",
          codeHash: hashOtp(emailCode),
          expiresAt: new Date(Date.now() + OTP_TTL_MS),
        },
        {
          userId: user.id,
          type: "PHONE",
          purpose: "CONTACT_PHONE",
          codeHash: hashOtp(phoneCode),
          expiresAt: new Date(Date.now() + OTP_TTL_MS),
        },
      ],
    });

    return user;
  });

  await sendOtpEmail({ to: created.email, code: emailCode });
  console.log("OTP PHONE (SMS) =", phoneCode, "for", created.telephone);

  return {
    message: "Compte créé. Vérifie ton email et ton téléphone avant de te connecter.",
    nextStep: "VERIFY_CONTACTS",
  };
}

/**
 * VERIFY CONTACT (public)
 * body: { identifier, type: EMAIL|PHONE, code }
 * - verify sur purpose CONTACT_EMAIL/CONTACT_PHONE
 */
export async function verifyContact({ identifier, type, code }) {
  const user = await prisma.utilisateur.findFirst({
    where: { OR: [{ email: identifier }, { telephone: identifier }] },
    select: { id: true, email: true, telephone: true },
  });

  if (!user) throw Object.assign(new Error("Utilisateur introuvable"), { status: 404 });

  if (type === "EMAIL" && user.email !== identifier) {
    throw Object.assign(new Error("Identifier doit être l'email pour une vérification EMAIL"), { status: 400 });
  }
  if (type === "PHONE" && user.telephone !== identifier) {
    throw Object.assign(new Error("Identifier doit être le téléphone pour une vérification PHONE"), { status: 400 });
  }

  const purpose = contactPurpose(type);
  if (!purpose) throw Object.assign(new Error("Type invalide"), { status: 400 });

  const row = await prisma.verificationCode.findFirst({
    where: { userId: user.id, type, purpose, usedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!row) throw Object.assign(new Error("Code introuvable"), { status: 400 });
  if (row.expiresAt < new Date()) throw Object.assign(new Error("Code expiré"), { status: 400 });
  if (row.codeHash !== hashOtp(code)) throw Object.assign(new Error("Code invalide"), { status: 400 });

  await prisma.$transaction(async (tx) => {
    await tx.verificationCode.update({
      where: { id: row.id },
      data: { usedAt: new Date() },
    });

    const patch = type === "EMAIL"
      ? { emailVerifiedAt: new Date() }
      : { phoneVerifiedAt: new Date() };

    const updated = await tx.utilisateur.update({
      where: { id: user.id },
      data: patch,
      select: { emailVerifiedAt: true, phoneVerifiedAt: true },
    });

    if (updated.emailVerifiedAt && updated.phoneVerifiedAt) {
      await tx.utilisateur.update({
        where: { id: user.id },
        data: { status: "ACTIVE" },
      });
    }
  });

  return { message: "Vérification réussie" };
}

/**
 * RESEND CODE (public)
 * body: { identifier, type: EMAIL|PHONE }
 * - crée nouveau OTP contact (purpose CONTACT_*)
 */
export async function resendCode({ identifier, type }) {
  const user = await prisma.utilisateur.findFirst({
    where: { OR: [{ email: identifier }, { telephone: identifier }] },
    select: { id: true, email: true, telephone: true },
  });

  if (!user) throw Object.assign(new Error("Utilisateur introuvable"), { status: 404 });

  if (type === "EMAIL" && user.email !== identifier) {
    throw Object.assign(new Error("Identifier doit être l'email pour resend EMAIL"), { status: 400 });
  }
  if (type === "PHONE" && user.telephone !== identifier) {
    throw Object.assign(new Error("Identifier doit être le téléphone pour resend PHONE"), { status: 400 });
  }

  const purpose = contactPurpose(type);
  if (!purpose) throw Object.assign(new Error("Type invalide"), { status: 400 });

  const newCode = generateOtp6();

  await prisma.verificationCode.create({
    data: {
      userId: user.id,
      type,
      purpose,
      codeHash: hashOtp(newCode),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
    },
  });

  if (type === "EMAIL") {
    await sendOtpEmail({ to: user.email, code: newCode });
  } else {
    console.log("OTP PHONE (SMS) =", newCode, "for", user.telephone);
  }

  return { message: "Code renvoyé" };
}

/**
 * LOGIN (adaptatif 2FA)
 * - signature CHANGÉE: login(req, { identifier, motDePasse })
 * - si device trusted => token direct
 * - sinon => retourne { twoFactorRequired:true, challengeId,... } (controller doit répondre 202)
 */
export async function login(req, { identifier, motDePasse }) {
  const user = await prisma.utilisateur.findFirst({
    where: { OR: [{ email: identifier }, { telephone: identifier }] },
    select: {
      id: true,
      nomComplet: true,
      email: true,
      telephone: true,
      role: true,
      motDePasseHash: true,
      status: true,
      emailVerifiedAt: true,
      phoneVerifiedAt: true,
    },
  });

  if (!user) throw Object.assign(new Error("Identifiants invalides"), { status: 401 });

  const ok = await verifyPassword(motDePasse, user.motDePasseHash);
  if (!ok) throw Object.assign(new Error("Identifiants invalides"), { status: 401 });

  const verified = user.status === "ACTIVE" && user.emailVerifiedAt && user.phoneVerifiedAt;
  if (!verified) {
    throw Object.assign(new Error("Vérifie ton email et ton téléphone avant de te connecter"), {
      status: 403,
      code: "CONTACT_NOT_VERIFIED",
    });
  }

  const deviceId = getDeviceId(req);
  const deviceToken = getDeviceToken(req);
  const ip = getClientIp(req);
  const ua = getUserAgent(req);

  const trusted = deviceId ? await getTrustedDeviceForUser(user.id, deviceId) : null;

  let trustedOk = false;
  if (trusted && deviceToken) {
    trustedOk = sha256(deviceToken) === trusted.deviceTokenHash;
  }

  //  plus de suspicion : 2FA seulement si device pas trusted
  const require2fa = !trustedOk;

  if (require2fa) {
    const code = generateOtp6();
    const channel = "EMAIL";

    const challenge = await prisma.$transaction(async (tx) => {
      return createLogin2faChallenge(tx, user.id, channel, code);
    });

    await sendOtpEmail({ to: user.email, code });

    return {
      twoFactorRequired: true,
      challengeId: challenge.id,
      channel,
      message: "Code 2FA envoyé",
    };
  }

  //  device trusted => update last seen
  if (trusted) {
    await prisma.trustedDevice.update({
      where: { id: trusted.id },
      data: { lastSeenAt: new Date(), lastIp: ip, userAgent: ua },
    });
  }

  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = await createSessionForUser(user.id, req);

  return {
    user: {
      id: user.id,
      nomComplet: user.nomComplet,
      email: user.email,
      telephone: user.telephone,
      role: user.role,
    },
    accessToken,
    refreshToken
  };


}

/**
 * VERIFY LOGIN 2FA
 * - signature: verifyLogin2fa(req, { challengeId, code, rememberDevice })
 * - si OK => renvoie { token, deviceToken? }
 * - deviceToken est à stocker côté front et renvoyer en header X-Device-Token
 */
export async function verifyLogin2fa(req, { challengeId, code, rememberDevice = true }) {
  const row = await prisma.verificationCode.findUnique({
    where: { id: challengeId },
    select: {
      id: true,
      userId: true,
      purpose: true,
      codeHash: true,
      expiresAt: true,
      usedAt: true,
      utilisateur: { select: { id: true, role: true, email: true, telephone: true } },
    },
  });

  if (!row) throw Object.assign(new Error("Challenge introuvable"), { status: 404 });
  if (row.purpose !== "LOGIN_2FA") throw Object.assign(new Error("Challenge invalide"), { status: 400 });
  if (row.usedAt) throw Object.assign(new Error("Code déjà utilisé"), { status: 400 });
  if (row.expiresAt < new Date()) throw Object.assign(new Error("Code expiré"), { status: 400 });
  if (row.codeHash !== hashOtp(code)) throw Object.assign(new Error("Code invalide"), { status: 400 });

  const deviceId = getDeviceId(req);
  const ip = getClientIp(req);
  const ua = getUserAgent(req);

  let deviceToken = null;

  await prisma.$transaction(async (tx) => {
    await tx.verificationCode.update({
      where: { id: row.id },
      data: { usedAt: new Date() },
    });

    if (!rememberDevice) return;
    if (!deviceId) return; // sans deviceId, pas de trusted device

    deviceToken = randomToken(32);
    const tokenHash = sha256(deviceToken);
    const expiresAt = new Date(Date.now() + TRUSTED_DEVICE_TTL_MS);

    await tx.trustedDevice.upsert({
      where: { userId_deviceId: { userId: row.userId, deviceId } },
      create: {
        userId: row.userId,
        deviceId,
        deviceTokenHash: tokenHash,
        userAgent: ua,
        lastIp: ip,
        expiresAt,
      },
      update: {
        deviceTokenHash: tokenHash, // rotation
        userAgent: ua,
        lastIp: ip,
        lastSeenAt: new Date(),
        expiresAt,
        revokedAt: null,
      },
    });
  });

  const accessToken = signAccessToken({ sub: row.userId, role: row.utilisateur.role });
  const refreshToken = await createSessionForUser(row.userId, req);

  return {
    accessToken,
    refreshToken, 
    ...(rememberDevice && deviceToken ? { deviceToken } : {}),
  };

}

/**
 * ME (protégé)
 */
export async function me(userId) {
  const user = await prisma.utilisateur.findUnique({
    where: { id: userId },
    select: {
      id: true,
      nomComplet: true,
      email: true,
      telephone: true,
      role: true,
      status: true,
      emailVerifiedAt: true,
      phoneVerifiedAt: true,
      dateCreation: true,
      updatedAt: true,
      client: true,
      prestataire: true,
      vendeur: true,
      administrateur: true,
    },
  });

  if (!user) throw Object.assign(new Error("Utilisateur introuvable"), { status: 404 });

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


export async function listDevices(userId) {
  const devices = await prisma.trustedDevice.findMany({
    where: {
      userId,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { lastSeenAt: "desc" },
    select: {
      id: true,
      deviceId: true,
      userAgent: true,
      lastIp: true,
      createdAt: true,
      lastSeenAt: true,
      expiresAt: true,
      revokedAt: true,
    },
  });

  return { devices };
}

export async function logoutCurrentDevice(req, userId) {
  const deviceId = getDeviceId(req);
  if (!deviceId) {
    throw Object.assign(new Error("X-Device-Id manquant"), { status: 400 });
  }

  const device = await prisma.trustedDevice.findFirst({
    where: {
      userId,
      deviceId,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    select: { id: true },
  });

  if (!device) {
    // on ne révèle pas trop d’infos
    return { message: "Aucun appareil à révoquer (déjà révoqué/expiré ou inconnu)." };
  }

  await prisma.trustedDevice.update({
    where: { id: device.id },
    data: { revokedAt: new Date() },
  });

  return { message: "Appareil courant révoqué. La prochaine connexion demandera la 2FA." };
}

export async function revokeDeviceById(userId, deviceRowId) {
  const device = await prisma.trustedDevice.findUnique({
    where: { id: deviceRowId },
    select: { id: true, userId: true, revokedAt: true },
  });

  if (!device || device.userId !== userId) {
    throw Object.assign(new Error("Appareil introuvable"), { status: 404 });
  }

  if (device.revokedAt) {
    return { message: "Appareil déjà révoqué." };
  }

  await prisma.trustedDevice.update({
    where: { id: device.id },
    data: { revokedAt: new Date() },
  });

  return { message: "Appareil révoqué." };
}



export async function revokeAllDevices(userId) {
  const result = await prisma.trustedDevice.updateMany({
    where: {
      userId,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    data: { revokedAt: new Date() },
  });

  return {
    message: "Tous les appareils ont été révoqués. La prochaine connexion demandera la 2FA.",
    revokedCount: result.count,
  };
}



async function createSessionForUser(userId, req) {
  const deviceId = getDeviceId(req);
  const ip = getClientIp(req);
  const ua = getUserAgent(req);

  const refreshToken = randomToken(32);
  const refreshTokenHash = sha256(refreshToken);

  await prisma.session.create({
    data: {
      userId,
      refreshTokenHash,
      deviceId,
      ip,
      userAgent: ua,
      expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
      lastUsedAt: new Date(),
    },
  });

  return refreshToken;
}



export async function refresh(req) {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) throw Object.assign(new Error("Refresh token manquant"), { status: 401 });

  const tokenHash = sha256(refreshToken);

  const session = await prisma.session.findFirst({
    where: {
      refreshTokenHash: tokenHash,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    select: { id: true, userId: true, utilisateur: { select: { role: true } } },
  });

  if (!session) {
    throw Object.assign(new Error("Refresh token invalide ou expiré"), { status: 401 });
  }

  // rotation
  const newRefreshToken = randomToken(32);
  const newHash = sha256(newRefreshToken);

  await prisma.session.update({
    where: { id: session.id },
    data: {
      refreshTokenHash: newHash,
      lastUsedAt: new Date(),
      ip: getClientIp(req),
      userAgent: getUserAgent(req),
    },
  });

  const accessToken = signAccessToken({ sub: session.userId, role: session.utilisateur.role });

  return { accessToken, refreshToken: newRefreshToken };
}


export async function logout(req) {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) return { message: "Déjà déconnecté." };

  const tokenHash = sha256(refreshToken);

  const session = await prisma.session.findFirst({
    where: { refreshTokenHash: tokenHash, revokedAt: null },
    select: { id: true },
  });

  if (!session) return { message: "Déjà déconnecté." };

  await prisma.session.update({
    where: { id: session.id },
    data: { revokedAt: new Date() },
  });

  return { message: "Session révoquée. Déconnecté." };
}


export async function logoutAll(userId) {
  const now = new Date();

  // 1) Révoquer toutes les sessions (refresh tokens)
  const sessions = await prisma.session.updateMany({
    where: {
      userId,
      revokedAt: null,
      expiresAt: { gt: now },
    },
    data: { revokedAt: now },
  });

  // 2) (Optionnel mais recommandé) Révoquer tous les trusted devices
  // -> forcera une 2FA au prochain login sur n'importe quel device
  const devices = await prisma.trustedDevice.updateMany({
    where: {
      userId,
      revokedAt: null,
      expiresAt: { gt: now },
    },
    data: { revokedAt: now },
  });

  return {
    message: "Déconnexion globale effectuée.",
    revokedSessions: sessions.count,
    revokedDevices: devices.count,
  };
}


// ===== PASSWORD RESET =====

export async function forgotPassword({ email }) {
  const user = await prisma.utilisateur.findUnique({
    where: { email },
    select: { id: true, email: true },
  });

  // Anti-enum: même message si email inexistant
  if (!user) return { message: "Si cet email existe, un code a été envoyé." };

  // Cooldown anti-spam
  await ensureResendCooldown(prisma, user.id, "EMAIL", "PASSWORD_RESET");

  // Invalider anciens codes non utilisés
  await prisma.verificationCode.updateMany({
    where: { userId: user.id, type: "EMAIL", purpose: "PASSWORD_RESET", usedAt: null },
    data: { usedAt: new Date() },
  });

  const code = generateOtp6();

  await prisma.verificationCode.create({
    data: {
      userId: user.id,
      type: "EMAIL",
      purpose: "PASSWORD_RESET",
      codeHash: hashOtp(code),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
      // attempts default 0
    },
  });

  await sendOtpEmail({ to: user.email, code });

  return { message: "Si cet email existe, un code a été envoyé." };
}

export async function resetPassword({ email, code, newPassword }) {
  const user = await prisma.utilisateur.findUnique({
    where: { email },
    select: { id: true },
  });

  // Anti-enum
  if (!user) return { message: "Code invalide ou expiré." };

  const row = await prisma.verificationCode.findFirst({
    where: {
      userId: user.id,
      type: "EMAIL",
      purpose: "PASSWORD_RESET",
      usedAt: null,
    },
    orderBy: { createdAt: "desc" },
    select: { id: true, codeHash: true, attempts: true, expiresAt: true, usedAt: true },
  });

  await verifyOtpOrThrow(prisma, row, code);

  const motDePasseHash = await hashPassword(newPassword);
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    // Marquer OTP utilisé
    await tx.verificationCode.update({
      where: { id: row.id },
      data: { usedAt: now },
    });

    // Changer password
    await tx.utilisateur.update({
      where: { id: user.id },
      data: { motDePasseHash },
    });

    // Révoquer sessions + trusted devices
    await tx.session.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: now },
    });

    await tx.trustedDevice.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: now },
    });
  });

  return { message: "Mot de passe mis à jour. Reconnecte-toi." };
}

export async function changePassword(userId, { currentPassword, newPassword }) {
  const user = await prisma.utilisateur.findUnique({
    where: { id: userId },
    select: { id: true, motDePasseHash: true },
  });

  if (!user) throw Object.assign(new Error("Utilisateur introuvable"), { status: 404 });

  const ok = await verifyPassword(currentPassword, user.motDePasseHash);
  if (!ok) throw Object.assign(new Error("Mot de passe actuel incorrect"), { status: 401 });

  const motDePasseHash = await hashPassword(newPassword);

  await prisma.utilisateur.update({
    where: { id: userId },
    data: { motDePasseHash },
  });

  // Optionnel (recommandé): révoquer toutes les sessions sauf celle courante si tu veux
  await prisma.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });

  return { message: "Mot de passe modifié avec succès." };
}

// ====== INTERNAL HELPERS ======

async function ensureResendCooldown(tx, userId, type, purpose) {
  const lastCode = await tx.verificationCode.findFirst({
    where: { userId, type, purpose },
    orderBy: { createdAt: "desc" },
  });

  if (lastCode) {
    const elapsed = Date.now() - new Date(lastCode.createdAt).getTime();
    if (elapsed < 60 * 1000) { // 1 minute cooldown
       throw Object.assign(new Error("Veuillez patienter avant de demander un nouveau code."), { status: 429 });
    }
  }
}

async function verifyOtpOrThrow(tx, row, codeCandidate) {
  if (!row) throw Object.assign(new Error("Code introuvable ou expiré"), { status: 400 });
  if (row.usedAt) throw Object.assign(new Error("Code déjà utilisé"), { status: 400 });
  if (row.expiresAt < new Date()) throw Object.assign(new Error("Code expiré"), { status: 400 });

  // check attempts
  if (row.attempts >= 3) {
     throw Object.assign(new Error("Trop de tentatives. Demandez un nouveau code."), { status: 429 });
  }

  if (row.codeHash !== hashOtp(codeCandidate)) {
    // increment attempts
    await tx.verificationCode.update({
        where: { id: row.id },
        data: { attempts: { increment: 1 } }
    });
    throw Object.assign(new Error("Code incorrect"), { status: 400 });
  }
}

