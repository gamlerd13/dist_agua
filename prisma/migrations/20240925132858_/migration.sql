/*
  Warnings:

  - You are about to drop the column `bottlePrice` on the `SaleDetail` table. All the data in the column will be lost.
  - Added the required column `includeBottlePrice` to the `SaleDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleDetail" DROP COLUMN "bottlePrice",
ADD COLUMN     "includeBottlePrice" BOOLEAN NOT NULL;
