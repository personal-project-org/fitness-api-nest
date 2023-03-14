import { Module } from '@nestjs/common';
import { ExerciseRepository } from 'src/api/exercises/repository/exercise.repository';
import { FoodRepository } from 'src/api/food/repository/food.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, FoodRepository, ExerciseRepository],
  exports: [PrismaService, FoodRepository, ExerciseRepository],
})
export class PrismaModule {}
