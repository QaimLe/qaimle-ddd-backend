/*
  Warnings:

  - The primary key for the `EvaluationQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."EvaluationAnswer" DROP CONSTRAINT "EvaluationAnswer_questionId_fkey";

-- AlterTable
ALTER TABLE "public"."EvaluationAnswer" ALTER COLUMN "questionId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."EvaluationQuestion" DROP CONSTRAINT "EvaluationQuestion_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "EvaluationQuestion_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EvaluationQuestion_id_seq";

-- AddForeignKey
ALTER TABLE "public"."EvaluationAnswer" ADD CONSTRAINT "EvaluationAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."EvaluationQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
