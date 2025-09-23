import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Starting full database reset...");

    // Evaluation-related tables
    await prisma.evaluationAnswer.deleteMany({});
    await prisma.evaluation.deleteMany({});
    await prisma.evaluationQuestionOption.deleteMany({});
    await prisma.evaluationQuestion.deleteMany({});
    await prisma.evaluationCriterion.deleteMany({});
    await prisma.evaluationCategory.deleteMany({});
    await prisma.evaluationTemplate.deleteMany({});

    // Provider-related tables
    await prisma.providerVote.deleteMany({});      // 👈 delete votes first
    await prisma.providerRequest.deleteMany({});   // then requests

    // User-related tables
    await prisma.userRole.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.serviceProvider.deleteMany({});

    console.log("All tables cleared successfully.");
}

main()
    .catch((e) => {
        console.error("Error during reset:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("Disconnected from database.");
    });
