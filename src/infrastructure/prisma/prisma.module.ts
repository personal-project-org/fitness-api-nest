import { Module } from '@nestjs/common';
import { ExerciseRepository } from '../../api/exercises/repository/exercise.repository';
import { FoodRepository } from '../../api/food/repository/food.repository';
import { SetRepository } from '../../api/sets/repository/set.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, FoodRepository, ExerciseRepository, SetRepository],
  exports: [PrismaService, FoodRepository, ExerciseRepository, SetRepository],
})
export class PrismaModule {}
