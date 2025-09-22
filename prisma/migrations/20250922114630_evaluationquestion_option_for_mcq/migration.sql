-- CreateTable
CREATE TABLE "public"."EvaluationQuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "value" INTEGER,
    "orderIndex" INTEGER,

    CONSTRAINT "EvaluationQuestionOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."EvaluationQuestionOption" ADD CONSTRAINT "EvaluationQuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."EvaluationQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
