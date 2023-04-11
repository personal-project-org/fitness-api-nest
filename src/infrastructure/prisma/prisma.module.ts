import { Module } from '@nestjs/common';
import { CaloricBalanceFactorRepository } from 'src/api/caloric-balance-factor/repository/factor.repository';
import { AccountRepository } from '../../api/accounts/repository/account.repository';
import { ExerciseRepository } from '../../api/exercises/repository/exercise.repository';
import { FoodRepository } from '../../api/food/repository/food.repository';
import { SetRepository } from '../../api/sets/repository/set.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    FoodRepository,
    ExerciseRepository,
    SetRepository,
    AccountRepository,
    CaloricBalanceFactorRepository,
  ],
  exports: [
    PrismaService,
    FoodRepository,
    ExerciseRepository,
    SetRepository,
    AccountRepository,
    CaloricBalanceFactorRepository,
  ],
})
export class PrismaModule {}
