import { prisma } from "../src/db/prisma.js";
import bcrypt from "bcrypt";
import { Role } from "../src/generated/prisma/index.js";

async function main() {
  console.log("Début du seeding des prestataires...");

  const passwordHash = await bcrypt.hash("password123", 10);

  const prestatairesData = [
    {
      nomComplet: "Jean Dupont",
      email: "jean.prestataire@test.com",
      telephone: "620000001",
      tarifHoraire: 20,
      noteMoyenne: 4.2,
    },
    {
      nomComplet: "Marie Diallo",
      email: "marie.prestataire@test.com",
      telephone: "620000002",
      tarifHoraire: 25,
      noteMoyenne: 4.7,
    },
    {
      nomComplet: "Ibrahima Camara",
      email: "ibrahima.prestataire@test.com",
      telephone: "620000003",
      tarifHoraire: 18,
      noteMoyenne: 4.0,
    },
    {
      nomComplet: "Fatou Bah",
      email: "fatou.prestataire@test.com",
      telephone: "620000004",
      tarifHoraire: 30,
      noteMoyenne: 4.9,
    },
  ];

  for (const p of prestatairesData) {
    const user = await prisma.utilisateur.create({
      data: {
        nomComplet: p.nomComplet,
        email: p.email,
        telephone: p.telephone,
        motDePasseHash: passwordHash,
        role: Role.PRESTATAIRE,

        prestataire: {
          create: {
            tarifHoraire: p.tarifHoraire,
            noteMoyenne: p.noteMoyenne,
            disponible: true,
          },
        },
      },
    });

    console.log(`Prestataire créé : ${user.nomComplet}`);
  }

  console.log("Seeding terminé !");
}

main()
  .catch((error) => {
    console.error("Erreur lors du seed :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
