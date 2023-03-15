/*
  Warnings:

  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Accounts";

-- DropTable
DROP TABLE "Exercises";

-- DropTable
DROP TABLE "Sets";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "body_part" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "calories_goal" TEXT NOT NULL,
    "protein_goal" TEXT NOT NULL,
    "carbs_goal" TEXT NOT NULL,
    "fats_goal" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
