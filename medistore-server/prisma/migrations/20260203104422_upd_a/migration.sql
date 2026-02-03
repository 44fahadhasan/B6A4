/*
  Warnings:

  - A unique constraint covering the columns `[userId,medicineId]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "cart_items_medicineId_idx" ON "cart_items"("medicineId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_userId_medicineId_key" ON "cart_items"("userId", "medicineId");
