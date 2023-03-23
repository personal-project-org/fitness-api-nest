import { CaloricBalanceFactor as CaloricBalanceFactorItems } from '@prisma/client';
import { CaloricBalanceFactor } from '../entities/local-model/factor.entity';

export const mapDbEntityToDomainEntity = (
  entity: CaloricBalanceFactorItems,
): CaloricBalanceFactor => {
  return new CaloricBalanceFactor(
    entity.id,
    entity.accountId,
    entity.exerciseId,
    entity.date,
    entity.balanceFactorType,
    undefined,
    undefined,
    entity.caloriesBurned,
    entity.caloriesConsumed,
    entity.protein,
    entity.carbs,
    entity.fat,
  );
};
