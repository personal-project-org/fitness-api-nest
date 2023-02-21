-- CreateTable
CREATE TABLE "Exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "body_part" TEXT NOT NULL,
    "reps" INTEGER[],
    "weight" INTEGER[],

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "calories_goal" TEXT NOT NULL,
    "protein_goal" TEXT NOT NULL,
    "carbs_goal" TEXT NOT NULL,
    "fats_goal" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);
