/*
  Warnings:

  - The primary key for the `Evaluation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EvaluationAnswer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."EvaluationAnswer" DROP CONSTRAINT "EvaluationAnswer_evaluationId_fkey";

-- AlterTable
ALTER TABLE "public"."Evaluation" DROP CONSTRAINT "Evaluation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Evaluation_id_seq";

-- AlterTable
ALTER TABLE "public"."EvaluationAnswer" DROP CONSTRAINT "EvaluationAnswer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "evaluationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "EvaluationAnswer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EvaluationAnswer_id_seq";

-- AddForeignKey
ALTER TABLE "public"."EvaluationAnswer" ADD CONSTRAINT "EvaluationAnswer_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "public"."Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
