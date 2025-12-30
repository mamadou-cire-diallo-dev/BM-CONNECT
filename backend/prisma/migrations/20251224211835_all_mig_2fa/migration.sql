/*
  Warnings:

  - Added the required column `purpose` to the `verification_code` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VerificationPurpose" AS ENUM ('CONTACT_EMAIL', 'CONTACT_PHONE', 'LOGIN_2FA');

-- DropIndex
DROP INDEX "verification_code_userId_type_idx";

-- AlterTable
ALTER TABLE "verification_code" ADD COLUMN     "purpose" "VerificationPurpose" NOT NULL;

-- CreateTable
CREATE TABLE "trusted_device" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "deviceId" TEXT NOT NULL,
    "deviceTokenHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "lastIp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "trusted_device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trusted_device_userId_idx" ON "trusted_device"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "trusted_device_userId_deviceId_key" ON "trusted_device"("userId", "deviceId");

-- CreateIndex
CREATE INDEX "verification_code_userId_type_purpose_idx" ON "verification_code"("userId", "type", "purpose");

-- AddForeignKey
ALTER TABLE "trusted_device" ADD CONSTRAINT "trusted_device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
