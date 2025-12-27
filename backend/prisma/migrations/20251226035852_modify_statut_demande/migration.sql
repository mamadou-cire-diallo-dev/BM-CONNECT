/*
  Warnings:

  - The values [ACCEPTEE,TERMINEE] on the enum `StatutDemande` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `acompt` on the `demande_service` table. All the data in the column will be lost.
  - Made the column `dateSouhaitee` on table `demande_service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatutDemande_new" AS ENUM ('EN_ATTENTE', 'ACOMPTE_EN_ATTENTE', 'EN_COURS', 'FACTUREE', 'PAYEE', 'ANNULEE', 'REFUSEE');
ALTER TABLE "public"."demande_service" ALTER COLUMN "statut" DROP DEFAULT;
ALTER TABLE "demande_service" ALTER COLUMN "statut" TYPE "StatutDemande_new" USING ("statut"::text::"StatutDemande_new");
ALTER TYPE "StatutDemande" RENAME TO "StatutDemande_old";
ALTER TYPE "StatutDemande_new" RENAME TO "StatutDemande";
DROP TYPE "public"."StatutDemande_old";
ALTER TABLE "demande_service" ALTER COLUMN "statut" SET DEFAULT 'EN_ATTENTE';
COMMIT;

-- AlterTable
ALTER TABLE "demande_service" DROP COLUMN "acompt",
ADD COLUMN     "acoumpt" DECIMAL(12,2),
ALTER COLUMN "dateSouhaitee" SET NOT NULL;
