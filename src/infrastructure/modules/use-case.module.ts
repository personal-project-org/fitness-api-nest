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
import { CreateAccountHandler } from 'src/api/accounts/use-cases/create/create-account.handler';
import { DeleteAccountHandler } from 'src/api/accounts/use-cases/delete/delete-account.handler';
import { UpdateAccountHandler } from 'src/api/accounts/use-cases/update/update-account.handler';
import { GetAllAccountsHandler } from 'src/api/accounts/use-cases/get-all-accounts/get-all-accounts.handler';
import { CreateCaloricBalanceFactorHandler } from 'src/api/caloric-balance-factor/use-cases/create/create-factor.handler';
import { DeleteCaloricBalanceFactorHandler } from 'src/api/caloric-balance-factor/use-cases/delete/delete-factor.handler';
import { GetAllCaloricBalanceFactorsHandler } from 'src/api/caloric-balance-factor/use-cases/get-all/get-all-factors.handler';
import { GetCaloricBalanceFactorsHandler } from 'src/api/caloric-balance-factor/use-cases/get/get-factors.handler';
import { UpdateCaloricBalanceFactorHandler } from 'src/api/caloric-balance-factor/use-cases/update/update-factor.handler';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateCaloricBalanceFactorHandler,
    DeleteCaloricBalanceFactorHandler,
    GetAllCaloricBalanceFactorsHandler,
    GetCaloricBalanceFactorsHandler,
    UpdateCaloricBalanceFactorHandler,
    CreateAccountHandler,
    DeleteAccountHandler,
    GetAllAccountsHandler,
    UpdateAccountHandler,
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
