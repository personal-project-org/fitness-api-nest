import { Module } from '@nestjs/common';
import { ExerciseApiModule } from 'src/api/exercises/exercise-api.module';
import { FoodApiModule } from '../../api/food/food-api.module';

@Module({
  imports: [ExerciseApiModule, FoodApiModule],
})
export class ApiModule {}
