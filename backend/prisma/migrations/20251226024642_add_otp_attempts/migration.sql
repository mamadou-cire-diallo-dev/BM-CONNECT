/*
  Warnings:

  - Added the required column `attempts` to the `verification_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "VerificationPurpose" ADD VALUE 'PASSWORD_RESET';

-- AlterTable
ALTER TABLE "verification_code" ADD COLUMN     "attempts" INTEGER NOT NULL;
