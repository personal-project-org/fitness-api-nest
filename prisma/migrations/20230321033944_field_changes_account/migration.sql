/*
  Warnings:

  - You are about to drop the column `calories_goal` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `carbs_goal` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `fats_goal` on the `Account` table. All the data in the column will be lost.
  - Added the required column `calorie_goal` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carb_goal` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat_goal` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "calories_goal",
DROP COLUMN "carbs_goal",
DROP COLUMN "fats_goal",
ADD COLUMN     "calorie_goal" TEXT NOT NULL,
ADD COLUMN     "carb_goal" TEXT NOT NULL,
ADD COLUMN     "fat_goal" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FoodConsumedByUser" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "food" JSONB NOT NULL,

    CONSTRAINT "FoodConsumedByUser_pkey" PRIMARY KEY ("id")
);
