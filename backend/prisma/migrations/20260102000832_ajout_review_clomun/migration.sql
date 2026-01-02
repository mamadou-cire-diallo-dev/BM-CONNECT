/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `paiement` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "facture_demandeId_key";

-- AlterTable
ALTER TABLE "demande_service" ADD COLUMN     "adresse" TEXT,
ADD COLUMN     "adresseId" UUID,
ADD COLUMN     "ville" TEXT;

-- AlterTable
ALTER TABLE "facture" ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'TOTAL';

-- AlterTable
ALTER TABLE "paiement" ADD COLUMN     "provider" TEXT,
ADD COLUMN     "reference" TEXT;

-- AlterTable
ALTER TABLE "service_offre" ADD COLUMN     "fraisTransport" DECIMAL(12,2) DEFAULT 0,
ADD COLUMN     "prixDiagnostic" DECIMAL(12,2) DEFAULT 0;

-- AlterTable
ALTER TABLE "utilisateur" ADD COLUMN     "photoProfil" TEXT;

-- CreateTable
CREATE TABLE "adresse" (
    "id" UUID NOT NULL,
    "titre" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "indications" TEXT,
    "estPrincipal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" UUID NOT NULL,

    CONSTRAINT "adresse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "adresse_clientId_idx" ON "adresse"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "paiement_reference_key" ON "paiement"("reference");

-- AddForeignKey
ALTER TABLE "demande_service" ADD CONSTRAINT "demande_service_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "adresse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresse" ADD CONSTRAINT "adresse_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
