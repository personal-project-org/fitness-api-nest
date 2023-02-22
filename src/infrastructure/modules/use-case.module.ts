import { Module, Logger } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';
import { CreateFoodHandler } from 'src/api/food/use-cases/create/create-food.handler';
import { DeleteFoodHandler } from 'src/api/food/use-cases/delete/delete-food.handler';
import { GetAllFoodHandler } from 'src/api/food/use-cases/get-all-foods/get-all.handler';
import { CreateExerciseHandler } from 'src/api/exercise/use-cases/create/create-exercise.handler';
import { UpdateFoodHandler } from 'src/api/food/use-cases/update/update.handler';
import { UpdateExerciseHandler } from 'src/api/exercise/use-cases/update/update-exercise.handler';
import { GetAllExerciseHandler } from 'src/api/exercise/use-cases/get-all-exercises/get-all-exercise.handler';
import { DeleteExerciseHandler } from 'src/api/exercise/use-cases/delete/delete-exercises.handler';

@Module({
  imports: [InfrastructureModule],
  providers: [
    DeleteExerciseHandler,
    GetAllExerciseHandler,
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
