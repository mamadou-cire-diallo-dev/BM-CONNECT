import { prisma } from "../src/db/prisma.js";
<<<<<<< HEAD
import bcrypt from "bcrypt";
import { Role } from "../src/generated/prisma/index.js";

async function main() {
  console.log("Début du seeding des clients...");

  const passwordHash = await bcrypt.hash("password123", 10);
    const admindata = {
        nomComplet: "Issaga Diallo",
        email: "issaga1842@gmail.com",
        telephone: "611968385",
        niveau:"SUPER_ADMIN"
    }


  const user = await prisma.utilisateur.create({
    data: {
        nomComplet: admindata.nomComplet,
        email: admindata.email,
        telephone: admindata.telephone,
        motDePasseHash: passwordHash,
        role: Role.ADMINISTRATEUR,

        administrateur: {
            create: {
                niveau:admindata.niveau
            },
        },
    }
  })
  console.log(`Administrateur créé : ${user.nomComplet}`);

  console.log("Seeding de l'administrateur terminé !");

//   const clientsData = [
//     {
//       nomComplet: "Aliou Keita",
//       email: "aliou.client@test.com",
//       telephone: "630000001",
//       adresse: "Quartier Kaloum",
//       type: "Particulier",
//       nif: "C123456",
//       siege: null,
//     },
//     {
//       nomComplet: "Aissatou Camara",
//       email: "aissatou.client@test.com",
//       telephone: "630000002",
//       adresse: "Conakry Centre",
//       type: "Entreprise",
//       nif: "E987654",
//       siege: "Plateau",
//     },
//     {
//       nomComplet: "Oumar Sylla",
//       email: "oumar.client@test.com",
//       telephone: "630000003",
//       adresse: "Matoto",
//       type: "Particulier",
//       nif: null,
//       siege: null,
//     },
//     {
//       nomComplet: "Fatimata Bah",
//       email: "fatimata.client@test.com",
//       telephone: "630000004",
//       adresse: "Ratoma",
//       type: "Entreprise",
//       nif: "E555555",
//       siege: "Kipé",
//     },
//   ];

//   for (const c of clientsData) {
//     const user = await prisma.utilisateur.create({
//       data: {
//         nomComplet: c.nomComplet,
//         email: c.email,
//         telephone: c.telephone,
//         motDePasseHash: passwordHash,
//         role: Role.CLIENT,
//         client: {
//           create: {
//             adresse: c.adresse,
//             type: c.type,
//             nif: c.nif,
//             siege: c.siege,
//           },
//         },
//       },
//     });

//     console.log(`Client créé : ${user.nomComplet}`);
//   }

//   console.log("Seeding des clients terminé !");
}

main()
  .catch((error) => {
    console.error("Erreur lors du seed :", error);
=======
import { buildUtilisateur, buildActor } from "./factories/utilisateur.factory.js";
import { buildCategory, buildOffer } from "./factories/service.factory.js";

async function resetDb() {
  console.log("Emptying database...");
  // Order matters for FK constraints
  await prisma.$transaction([
    prisma.serviceOffre.deleteMany({ hardDelete: true }),
    prisma.categorieService.deleteMany({ hardDelete: true }),
    prisma.session.deleteMany({ hardDelete: true }),
    prisma.trustedDevice.deleteMany({ hardDelete: true }),
    prisma.verificationCode.deleteMany({ hardDelete: true }),
    prisma.client.deleteMany({ hardDelete: true }),
    prisma.prestataire.deleteMany({ hardDelete: true }),
    prisma.vendeur.deleteMany({ hardDelete: true }),
    prisma.administrateur.deleteMany({ hardDelete: true }),
    prisma.utilisateur.deleteMany({ hardDelete: true }),
  ]);
}

async function createUserWithActor(role, overridesUser = {}, overridesActor = {}) {
  const userData = await buildUtilisateur(role, overridesUser);
  const user = await prisma.utilisateur.create({
    data: userData,
  });

  const actor = buildActor(role, user.id, overridesActor);
  if (actor) {
    await prisma[actor.model].create({ data: actor.data });
  }

  return user;
}

async function main() {
  console.log("🚀 Starting seeding...");

  await resetDb();

  // 1. FIXED ACCOUNTS
  console.log("Creating fixed accounts...");
  
  // Admin
  await createUserWithActor("ADMINISTRATEUR", {
    email: "mamadoudiallo34204@gmail.com",
    telephone: "620000000",
    nomComplet: "Admin BM-Connect",
    status: "ACTIVE"
  });

  // Test entities
  await createUserWithActor("CLIENT", { email: "client@test.com", nomComplet: "Jean Client" });
  const p1 = await createUserWithActor("PRESTATAIRE", { email: "prestataire@test.com", nomComplet: "Pierre Prestataire" });
  await createUserWithActor("VENDEUR", { email: "vendeur@test.com", nomComplet: "Valérie Vendeuse" });

  // 2. CATEGORIES
  console.log("Creating categories...");
  const categoriesData = [
    { nom: "Plomberie", description: "Dépannage et installation de tuyauterie" },
    { nom: "Électricité", description: "Travaux électriques et maintenance" },
    { nom: "Ménage", description: "Nettoyage et entretien domestique" },
    { nom: "Jardinage", description: "Tonte, taille et aménagement extérieur" },
    { nom: "Informatique", description: "Assistance et réparation ordinateur" },
  ];

  const categories = await Promise.all(
    categoriesData.map((c) => prisma.categorieService.create({ data: buildCategory(c) }))
  );

  // 3. RANDOM DATA
  console.log("Generating random data...");
  
  // Create 10 more prestataires
  const prestataires = [p1];
  for (let i = 0; i < 10; i++) {
    prestataires.push(await createUserWithActor("PRESTATAIRE"));
  }

  // Each prestataire creates 2-4 offers in random categories
  console.log("Generating offers...");
  for (const p of prestataires) {
    const numOffers = Math.floor(Math.random() * 3) + 2;
    for (let j = 0; j < numOffers; j++) {
      const cat = categories[Math.floor(Math.random() * categories.length)];
      await prisma.serviceOffre.create({
        data: buildOffer(p.id, cat.id)
      });
    }
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
>>>>>>> cire
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
