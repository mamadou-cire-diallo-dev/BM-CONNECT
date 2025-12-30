/*
  Warnings:

  - The primary key for the `prestataire_specialite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[prestataireId,specialiteId]` on the table `prestataire_specialite` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `prestataire_specialite` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "prestataire_specialite" DROP CONSTRAINT "prestataire_specialite_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "prestataire_specialite_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "prestataire_specialite_prestataireId_idx" ON "prestataire_specialite"("prestataireId");

-- CreateIndex
CREATE UNIQUE INDEX "prestataire_specialite_prestataireId_specialiteId_key" ON "prestataire_specialite"("prestataireId", "specialiteId");
