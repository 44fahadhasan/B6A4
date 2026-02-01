/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `pharmacies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pharmacies_ownerId_key" ON "pharmacies"("ownerId");
