/*
  Warnings:

  - The primary key for the `EvaluationCriterion` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."EvaluationQuestion" DROP CONSTRAINT "EvaluationQuestion_criterionId_fkey";

-- AlterTable
ALTER TABLE "public"."EvaluationCriterion" DROP CONSTRAINT "EvaluationCriterion_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "EvaluationCriterion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EvaluationCriterion_id_seq";

-- AlterTable
ALTER TABLE "public"."EvaluationQuestion" ALTER COLUMN "criterionId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."EvaluationQuestion" ADD CONSTRAINT "EvaluationQuestion_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "public"."EvaluationCriterion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
