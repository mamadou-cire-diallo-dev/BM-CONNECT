-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('PENDING_CONTACT', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('EMAIL', 'PHONE');

-- CreateEnum
CREATE TYPE "PrestataireVerificationStatus" AS ENUM ('PENDING_DOCS', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "prestataire" ADD COLUMN     "verificationStatus" "PrestataireVerificationStatus" NOT NULL DEFAULT 'PENDING_DOCS';

-- AlterTable
ALTER TABLE "utilisateur" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "phoneVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'PENDING_CONTACT';

-- CreateTable
CREATE TABLE "verification_code" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "VerificationType" NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "verification_code_userId_type_idx" ON "verification_code"("userId", "type");

-- AddForeignKey
ALTER TABLE "verification_code" ADD CONSTRAINT "verification_code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
