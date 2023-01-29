-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calories" TEXT NOT NULL,
    "protein" TEXT NOT NULL,
    "carbs" TEXT NOT NULL,
    "fats" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);
