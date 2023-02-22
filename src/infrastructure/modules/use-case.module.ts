import { Module, Logger } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';
import { CreateFoodHandler } from 'src/api/food/use-cases/create/create-food.handler';
import { DeleteFoodHandler } from 'src/api/food/use-cases/delete/delete-food.handler';
import { GetAllFoodHandler } from 'src/api/food/use-cases/get-all-foods/get-all.handler';
import { CreateExerciseHandler } from 'src/api/exercise/use-cases/create/create-exercise.handler';
import { UpdateFoodHandler } from 'src/api/food/use-cases/update/update.handler';
import { UpdateExerciseHandler } from 'src/api/exercise/use-cases/update/update-exercise.handler';

@Module({
  imports: [InfrastructureModule],
  providers: [
    UpdateExerciseHandler,
    CreateExerciseHandler,
    UpdateFoodHandler,
    CreateFoodHandler,
    DeleteFoodHandler,
    GetAllFoodHandler,
    Logger,
  ],
})
export class UseCaseModule {}
