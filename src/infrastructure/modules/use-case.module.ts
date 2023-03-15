import { Module, Logger } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure.module';
import { CreateFoodHandler } from '../../api/food/use-cases/create/create-food.handler';
import { DeleteFoodHandler } from '../../api/food/use-cases/delete/delete-food.handler';
import { GetAllFoodHandler } from '../../api/food/use-cases/get-all-foods/get-all.handler';
import { CreateExerciseHandler } from '../../api/exercises/use-cases/create/create-exercise.handler';
import { UpdateFoodHandler } from '../../api/food/use-cases/update/update-food.handler';
import { UpdateExerciseHandler } from '../../api/exercises/use-cases/update/update-exercise.handler';
import { GetAllExerciseHandler } from '../../api/exercises/use-cases/get-all-exercises/get-all-exercise.handler';
import { DeleteExerciseHandler } from '../../api/exercises/use-cases/delete/delete-exercises.handler';
import { CreateSetHandler } from '../../api/sets/use-cases/create/create-set.handler';
import { DeleteSetHandler } from '../../api/sets/use-cases/delete/delete-set.handler';
import { GetAllSetsHandler } from '../../api/sets/use-cases/get-all-sets/get-all-sets.handler';
import { UpdateSetHandler } from '../../api/sets/use-cases/update/update-set.command';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateSetHandler,
    DeleteSetHandler,
    GetAllSetsHandler,
    UpdateSetHandler,
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
