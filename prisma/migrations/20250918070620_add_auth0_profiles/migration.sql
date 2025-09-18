/*
  Warnings:

  - You are about to drop the `Auth0Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[auth0Id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Auth0Profile" DROP CONSTRAINT "Auth0Profile_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "auth0Id" TEXT;

-- DropTable
DROP TABLE "public"."Auth0Profile";

-- CreateIndex
CREATE UNIQUE INDEX "User_auth0Id_key" ON "public"."User"("auth0Id");
