/*
  Warnings:

  - You are about to drop the column `criterionId` on the `EvaluationAnswer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."EvaluationAnswer" DROP CONSTRAINT "EvaluationAnswer_criterionId_fkey";

-- AlterTable
ALTER TABLE "public"."EvaluationAnswer" DROP COLUMN "criterionId",
ADD COLUMN     "questionId" INTEGER;

-- CreateTable
CREATE TABLE "public"."EvaluationQuestion" (
    "id" SERIAL NOT NULL,
    "criterionId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "inputType" TEXT NOT NULL,
    "orderIndex" INTEGER,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EvaluationQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_users_deletedat" ON "public"."User"("deletedAt");

-- AddForeignKey
ALTER TABLE "public"."EvaluationQuestion" ADD CONSTRAINT "EvaluationQuestion_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "public"."EvaluationCriterion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EvaluationAnswer" ADD CONSTRAINT "EvaluationAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."EvaluationQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
