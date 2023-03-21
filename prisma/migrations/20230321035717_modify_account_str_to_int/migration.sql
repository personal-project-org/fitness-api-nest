/*
  Warnings:

  - Changed the type of `protein_goal` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `calorie_goal` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `carb_goal` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fat_goal` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "protein_goal",
ADD COLUMN     "protein_goal" INTEGER NOT NULL,
DROP COLUMN "calorie_goal",
ADD COLUMN     "calorie_goal" INTEGER NOT NULL,
DROP COLUMN "carb_goal",
ADD COLUMN     "carb_goal" INTEGER NOT NULL,
DROP COLUMN "fat_goal",
ADD COLUMN     "fat_goal" INTEGER NOT NULL;
