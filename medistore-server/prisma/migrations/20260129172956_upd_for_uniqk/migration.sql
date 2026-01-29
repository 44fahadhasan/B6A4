/*
  Warnings:

  - A unique constraint covering the columns `[userId,contactNumber]` on the table `delivery_addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "delivery_addresses_userId_contactNumber_idx";

-- CreateIndex
CREATE UNIQUE INDEX "delivery_addresses_userId_contactNumber_key" ON "delivery_addresses"("userId", "contactNumber");
