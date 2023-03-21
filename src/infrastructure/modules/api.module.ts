import { Module } from '@nestjs/common';
import { ExerciseApiModule } from '../../api/exercises/exercise-api.module';
import { SetApiModule } from '../../api/sets/set-api.module';
import { FoodApiModule } from '../../api/food/food-api.module';
import { AccountApiModule } from '../../api/accounts/account-api.module';

@Module({
  imports: [ExerciseApiModule, FoodApiModule, SetApiModule, AccountApiModule],
})
export class ApiModule {}
