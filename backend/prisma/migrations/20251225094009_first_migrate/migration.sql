-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'PRESTATAIRE', 'VENDEUR', 'ADMINISTRATEUR');

-- CreateTable
CREATE TABLE "utilisateur" (
    "id" UUID NOT NULL,
    "nomComplet" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "motDePasseHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" UUID NOT NULL,
    "adresse" TEXT,
    "type" TEXT,
    "nif" TEXT,
    "siege" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prestataire" (
    "id" UUID NOT NULL,
    "tarifHoraire" DECIMAL(12,2),
    "noteMoyenne" DOUBLE PRECISION,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prestataire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendeur" (
    "id" UUID NOT NULL,
    "nomBoutique" TEXT,
    "adresse" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendeur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrateur" (
    "id" UUID NOT NULL,
    "niveau" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "administrateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorie_service" (
    "id" UUID NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "categorie_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_offre" (
    "id" UUID NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "tempsEstime" INTEGER,
    "prix" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "prestataireId" UUID NOT NULL,
    "categorieId" UUID NOT NULL,

    CONSTRAINT "service_offre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demande_service" (
    "id" UUID NOT NULL,
    "dateSouhaitee" TIMESTAMP(3),
    "description" TEXT,
    "statut" TEXT NOT NULL,
    "coutEstime" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" UUID NOT NULL,
    "prestataireId" UUID NOT NULL,
    "offreId" UUID NOT NULL,

    CONSTRAINT "demande_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facture" (
    "id" UUID NOT NULL,
    "numero" TEXT NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montantTotal" DECIMAL(12,2),
    "pdfUrl" TEXT,
    "statut" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "demandeId" UUID NOT NULL,

    CONSTRAINT "facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paiement" (
    "id" UUID NOT NULL,
    "montant" DECIMAL(12,2),
    "modePaye" TEXT NOT NULL,
    "datePaiement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "factureId" UUID NOT NULL,

    CONSTRAINT "paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "canal" TEXT NOT NULL,
    "dateEnvoi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produit" (
    "id" UUID NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "prix" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendeurId" UUID NOT NULL,

    CONSTRAINT "produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_prestataire" (
    "id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "dateDepot" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prestataireId" UUID NOT NULL,

    CONSTRAINT "document_prestataire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "piece_jointe_demande" (
    "id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "dateAjout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "demandeId" UUID NOT NULL,

    CONSTRAINT "piece_jointe_demande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialite" (
    "id" UUID NOT NULL,
    "libelle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prestataire_specialite" (
    "id" UUID NOT NULL,
    "prestataireId" UUID NOT NULL,
    "specialiteId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prestataire_specialite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_email_key" ON "utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_telephone_key" ON "utilisateur"("telephone");

-- CreateIndex
CREATE INDEX "service_offre_prestataireId_idx" ON "service_offre"("prestataireId");

-- CreateIndex
CREATE INDEX "service_offre_categorieId_idx" ON "service_offre"("categorieId");

-- CreateIndex
CREATE INDEX "demande_service_clientId_idx" ON "demande_service"("clientId");

-- CreateIndex
CREATE INDEX "demande_service_prestataireId_idx" ON "demande_service"("prestataireId");

-- CreateIndex
CREATE INDEX "demande_service_offreId_idx" ON "demande_service"("offreId");

-- CreateIndex
CREATE UNIQUE INDEX "facture_numero_key" ON "facture"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "facture_demandeId_key" ON "facture"("demandeId");

-- CreateIndex
CREATE INDEX "facture_demandeId_idx" ON "facture"("demandeId");

-- CreateIndex
CREATE INDEX "paiement_factureId_idx" ON "paiement"("factureId");

-- CreateIndex
CREATE INDEX "notification_userId_idx" ON "notification"("userId");

-- CreateIndex
CREATE INDEX "produit_vendeurId_idx" ON "produit"("vendeurId");

-- CreateIndex
CREATE INDEX "document_prestataire_prestataireId_idx" ON "document_prestataire"("prestataireId");

-- CreateIndex
CREATE INDEX "piece_jointe_demande_demandeId_idx" ON "piece_jointe_demande"("demandeId");

-- CreateIndex
CREATE UNIQUE INDEX "specialite_libelle_key" ON "specialite"("libelle");

-- CreateIndex
CREATE INDEX "prestataire_specialite_specialiteId_idx" ON "prestataire_specialite"("specialiteId");

-- CreateIndex
CREATE INDEX "prestataire_specialite_prestataireId_idx" ON "prestataire_specialite"("prestataireId");

-- CreateIndex
CREATE UNIQUE INDEX "prestataire_specialite_prestataireId_specialiteId_key" ON "prestataire_specialite"("prestataireId", "specialiteId");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestataire" ADD CONSTRAINT "prestataire_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendeur" ADD CONSTRAINT "vendeur_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrateur" ADD CONSTRAINT "administrateur_id_fkey" FOREIGN KEY ("id") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_offre" ADD CONSTRAINT "service_offre_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "prestataire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_offre" ADD CONSTRAINT "service_offre_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "categorie_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demande_service" ADD CONSTRAINT "demande_service_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demande_service" ADD CONSTRAINT "demande_service_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "prestataire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demande_service" ADD CONSTRAINT "demande_service_offreId_fkey" FOREIGN KEY ("offreId") REFERENCES "service_offre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facture" ADD CONSTRAINT "facture_demandeId_fkey" FOREIGN KEY ("demandeId") REFERENCES "demande_service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paiement" ADD CONSTRAINT "paiement_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "facture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produit" ADD CONSTRAINT "produit_vendeurId_fkey" FOREIGN KEY ("vendeurId") REFERENCES "vendeur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_prestataire" ADD CONSTRAINT "document_prestataire_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "prestataire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "piece_jointe_demande" ADD CONSTRAINT "piece_jointe_demande_demandeId_fkey" FOREIGN KEY ("demandeId") REFERENCES "demande_service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestataire_specialite" ADD CONSTRAINT "prestataire_specialite_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "prestataire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestataire_specialite" ADD CONSTRAINT "prestataire_specialite_specialiteId_fkey" FOREIGN KEY ("specialiteId") REFERENCES "specialite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
