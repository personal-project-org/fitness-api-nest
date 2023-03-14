/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Exercise";

-- CreateTable
CREATE TABLE "Exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "body_part" TEXT NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sets" (
    "id" TEXT NOT NULL,
    "reps" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "Sets_pkey" PRIMARY KEY ("id")
);
