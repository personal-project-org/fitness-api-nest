/*
  Warnings:

  - Added the required column `accountId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "accountId" TEXT NOT NULL;
