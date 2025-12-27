import { prisma } from "../src/db/prisma.js";
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
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
