/*
  Warnings:

  - A unique constraint covering the columns `[medicineId]` on the table `inventories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "inventories_medicineId_key" ON "inventories"("medicineId");
