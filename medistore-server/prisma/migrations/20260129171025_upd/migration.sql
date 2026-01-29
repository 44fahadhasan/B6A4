/*
  Warnings:

  - Made the column `contactNumber` on table `delivery_addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "delivery_addresses" ALTER COLUMN "contactNumber" SET NOT NULL;
