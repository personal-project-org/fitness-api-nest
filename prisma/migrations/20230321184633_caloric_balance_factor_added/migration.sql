/*
  Warnings:

  - You are about to drop the `FoodConsumedByUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FoodConsumedByUser";

-- CreateTable
CREATE TABLE "CaloricBalanceFactor" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "balanceFactorType" TEXT NOT NULL,
    "foodDetails" JSONB,
    "exerciseDetails" JSONB,
    "caloriesBurned" INTEGER,

    CONSTRAINT "CaloricBalanceFactor_pkey" PRIMARY KEY ("id")
);
