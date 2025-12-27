/*
  Warnings:

  - You are about to drop the column `coutEstime` on the `demande_service` table. All the data in the column will be lost.
  - The `statut` column on the `demande_service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatutDemande" AS ENUM ('EN_ATTENTE', 'ACCEPTEE', 'REFUSEE', 'EN_COURS', 'TERMINEE', 'ANNULEE', 'FACTUREE', 'PAYEE');

-- AlterTable
ALTER TABLE "demande_service" DROP COLUMN "coutEstime",
ADD COLUMN     "acompt" DECIMAL(12,2),
ADD COLUMN     "coutPrestation" DECIMAL(12,2),
DROP COLUMN "statut",
ADD COLUMN     "statut" "StatutDemande" NOT NULL DEFAULT 'EN_ATTENTE';
