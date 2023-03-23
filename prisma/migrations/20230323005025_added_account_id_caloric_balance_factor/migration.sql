/*
  Warnings:

  - Added the required column `accountId` to the `CaloricBalanceFactor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CaloricBalanceFactor" ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "caloriesConsumed" INTEGER,
ADD COLUMN     "carbs" INTEGER,
ADD COLUMN     "exerciseId" TEXT,
ADD COLUMN     "fat" INTEGER,
ADD COLUMN     "protein" INTEGER;
