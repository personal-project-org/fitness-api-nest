import { Module } from '@nestjs/common';
import { ExerciseApiModule } from 'src/api/exercise/exercise-api.module';
import { FoodApiModule } from '../../api/food/food-api.module';

@Module({
  imports: [FoodApiModule, ExerciseApiModule],
})
export class ApiModule {}
