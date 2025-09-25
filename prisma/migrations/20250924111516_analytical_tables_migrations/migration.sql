/*
  Warnings:

  - You are about to drop the column `discountPct` on the `MembershipCoupon` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `MembershipCoupon` table. All the data in the column will be lost.
  - You are about to drop the column `validTo` on the `MembershipCoupon` table. All the data in the column will be lost.
  - You are about to drop the column `issueDate` on the `MembershipInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `totalCents` on the `MembershipInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `amountCents` on the `MembershipPayment` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `MembershipPayment` table. All the data in the column will be lost.
  - You are about to drop the column `providerTx` on the `MembershipPayment` table. All the data in the column will be lost.
  - Added the required column `discountType` to the `MembershipCoupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountValue` to the `MembershipCoupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `MembershipInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `MembershipPayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."MembershipInvoice" DROP CONSTRAINT "MembershipInvoice_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MembershipPayment" DROP CONSTRAINT "MembershipPayment_invoiceId_fkey";

-- AlterTable
ALTER TABLE "public"."MembershipCoupon" DROP COLUMN "discountPct",
DROP COLUMN "isActive",
DROP COLUMN "validTo",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discountType" TEXT NOT NULL,
ADD COLUMN     "discountValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maxRedemptions" INTEGER,
ADD COLUMN     "validUntil" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."MembershipInvoice" DROP COLUMN "issueDate",
DROP COLUMN "totalCents",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "currency" DROP DEFAULT,
ALTER COLUMN "status" SET DEFAULT 'unpaid';

-- AlterTable
ALTER TABLE "public"."MembershipPayment" DROP COLUMN "amountCents",
DROP COLUMN "currency",
DROP COLUMN "providerTx",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "providerTxnId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- CreateTable
CREATE TABLE "public"."MembershipChangeLog" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "oldTierId" INTEGER,
    "newTierId" INTEGER,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MembershipChangeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PaymentMethod" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "details" JSONB,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TransactionLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EventLog" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NotificationPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SystemConfig" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ErrorLog" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobQueue" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "JobQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_refreshToken_key" ON "public"."Session"("refreshToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "public"."Session"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_createdAt_idx" ON "public"."AuditLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentMethod_userId_isDefault_idx" ON "public"."PaymentMethod"("userId", "isDefault");

-- CreateIndex
CREATE INDEX "TransactionLog_userId_createdAt_idx" ON "public"."TransactionLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "UserActivity_userId_createdAt_idx" ON "public"."UserActivity"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "public"."Notification"("userId", "isRead");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreference_userId_channel_key" ON "public"."NotificationPreference"("userId", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfig_key_key" ON "public"."SystemConfig"("key");

-- CreateIndex
CREATE INDEX "MembershipCouponRedemption_couponId_idx" ON "public"."MembershipCouponRedemption"("couponId");

-- CreateIndex
CREATE INDEX "MembershipCouponRedemption_membershipId_idx" ON "public"."MembershipCouponRedemption"("membershipId");

-- CreateIndex
CREATE INDEX "MembershipInvoice_membershipId_idx" ON "public"."MembershipInvoice"("membershipId");

-- CreateIndex
CREATE INDEX "MembershipPayment_invoiceId_idx" ON "public"."MembershipPayment"("invoiceId");

-- AddForeignKey
ALTER TABLE "public"."MembershipChangeLog" ADD CONSTRAINT "MembershipChangeLog_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "public"."Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembershipChangeLog" ADD CONSTRAINT "MembershipChangeLog_oldTierId_fkey" FOREIGN KEY ("oldTierId") REFERENCES "public"."MembershipTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembershipChangeLog" ADD CONSTRAINT "MembershipChangeLog_newTierId_fkey" FOREIGN KEY ("newTierId") REFERENCES "public"."MembershipTier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembershipPayment" ADD CONSTRAINT "MembershipPayment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "public"."MembershipInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembershipInvoice" ADD CONSTRAINT "MembershipInvoice_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "public"."Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PaymentMethod" ADD CONSTRAINT "PaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TransactionLog" ADD CONSTRAINT "TransactionLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NotificationPreference" ADD CONSTRAINT "NotificationPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
