/*
  Warnings:

  - You are about to drop the column `distritoId` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `rutasId` on the `Cliente` table. All the data in the column will be lost.
  - You are about to alter the column `coordenadaX` on the `Cliente` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `coordenadaY` on the `Cliente` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Added the required column `rutaId` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_distritoId_fkey";

-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_rutasId_fkey";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "distritoId",
DROP COLUMN "rutasId",
ADD COLUMN     "pedidoConcurrencia" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rutaId" INTEGER NOT NULL,
ALTER COLUMN "coordenadaX" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "coordenadaY" SET DATA TYPE DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_rutaId_fkey" FOREIGN KEY ("rutaId") REFERENCES "Rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
