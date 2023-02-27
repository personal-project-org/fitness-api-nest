/*
  Warnings:

  - You are about to drop the `Exercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Exercises";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "body_part" TEXT NOT NULL,
    "reps" INTEGER[],
    "weight" INTEGER[],

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
