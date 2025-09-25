/*
  Warnings:

  - The primary key for the `Sector` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."EvaluationScore" DROP CONSTRAINT "EvaluationScore_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EvaluationTemplate" DROP CONSTRAINT "EvaluationTemplate_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProviderRequest" DROP CONSTRAINT "ProviderRequest_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceProvider" DROP CONSTRAINT "ServiceProvider_sectorId_fkey";

-- AlterTable
ALTER TABLE "public"."EvaluationScore" ALTER COLUMN "sectorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."EvaluationTemplate" ALTER COLUMN "sectorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."ProviderRequest" ALTER COLUMN "sectorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Sector" DROP CONSTRAINT "Sector_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sector_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Sector_id_seq";

-- AlterTable
ALTER TABLE "public"."ServiceProvider" ALTER COLUMN "sectorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."ServiceProvider" ADD CONSTRAINT "ServiceProvider_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "public"."Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationTemplate" ADD CONSTRAINT "EvaluationTemplate_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "public"."Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationScore" ADD CONSTRAINT "EvaluationScore_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "public"."Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProviderRequest" ADD CONSTRAINT "ProviderRequest_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "public"."Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
