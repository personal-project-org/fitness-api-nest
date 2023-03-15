import { Module } from '@nestjs/common';
import { ExerciseApiModule } from '../../api/exercises/exercise-api.module';
import { SetApiModule } from '../../api/sets/set-api.module';
import { FoodApiModule } from '../../api/food/food-api.module';

@Module({
  imports: [ExerciseApiModule, FoodApiModule, SetApiModule],
})
export class ApiModule {}
