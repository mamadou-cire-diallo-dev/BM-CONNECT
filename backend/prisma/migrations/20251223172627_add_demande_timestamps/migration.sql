/*
  Warnings:

  - Added the required column `updatedAt` to the `administrateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `categorie_service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `demande_service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `document_prestataire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `facture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `paiement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `piece_jointe_demande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `prestataire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `prestataire_specialite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `service_offre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `specialite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `vendeur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administrateur" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "categorie_service" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "demande_service" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "document_prestataire" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "facture" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "paiement" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "piece_jointe_demande" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "prestataire" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "prestataire_specialite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "produit" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "service_offre" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "specialite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "utilisateur" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "vendeur" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
