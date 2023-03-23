import { CaloricBalanceFactor } from '@prisma/client';
import { CaloricBalanceFactorObjectType } from './factor.object-type';

export const mapDomainEntityToGqlObjectType = (
  entity: CaloricBalanceFactor,
): CaloricBalanceFactorObjectType => {
  return {
    id: entity.id,
    accountId: entity.accountId,
    exerciseId: entity.exerciseId,
    date: entity.date,
    balanceFactorType: entity.balanceFactorType,
    caloriesBurned: entity.caloriesBurned,
    caloriesConsumed: entity.caloriesConsumed,
    protein: entity.protein,
    carbs: entity.carbs,
    fat: entity.fat,
  };
};
