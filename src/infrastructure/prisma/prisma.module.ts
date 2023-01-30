import { Module } from "@nestjs/common";
import { FoodRepository } from "src/core/food/food.repository";
import { PrismaService } from "./prisma.service";
import { FoodRepositoryImpl } from "./repositories/food/food.repository";

@Module({
    providers: [
      PrismaService,
      {
        provide: FoodRepository,
        useClass: FoodRepositoryImpl
      }
    ],
    exports: [
      PrismaService,
      FoodRepository
    ],
  })
  export class PrismaModule {}