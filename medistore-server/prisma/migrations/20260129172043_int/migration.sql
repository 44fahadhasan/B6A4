-- DropIndex
DROP INDEX "delivery_addresses_userId_idx";

-- CreateIndex
CREATE INDEX "delivery_addresses_userId_contactNumber_idx" ON "delivery_addresses"("userId", "contactNumber");
