/*
  Warnings:

  - You are about to drop the column `auth0Id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_auth0Id_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "auth0Id";

-- CreateTable
CREATE TABLE "public"."Auth0Profile" (
    "id" TEXT NOT NULL,
    "auth0Id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth0Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth0Profile_auth0Id_key" ON "public"."Auth0Profile"("auth0Id");

-- CreateIndex
CREATE INDEX "Auth0Profile_auth0Id_idx" ON "public"."Auth0Profile"("auth0Id");

-- CreateIndex
CREATE INDEX "Auth0Profile_email_idx" ON "public"."Auth0Profile"("email");

-- CreateIndex
CREATE INDEX "Auth0Profile_userId_idx" ON "public"."Auth0Profile"("userId");

-- AddForeignKey
ALTER TABLE "public"."Auth0Profile" ADD CONSTRAINT "Auth0Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
