/*
  Warnings:

  - The values [ADMIN,CARRIER,ASSISTANT] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('admin', 'carrier', 'assistant');
ALTER TABLE "User" ALTER COLUMN "typeUser" TYPE "UserType_new" USING ("typeUser"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;
