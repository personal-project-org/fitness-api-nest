import { Account } from '../local-model/account.entity';
import { AccountObjectType } from './account.object-type';

export const mapDomainEntityToGqlObjectType = (
  entity: Account,
): AccountObjectType => {
  return {
    id: entity.id,
    username: entity.username,
    password: entity.password,
    calorie_goal: entity.calorie_goal,
    protein_goal: entity.protein_goal,
    carb_goal: entity.carb_goal,
    fat_goal: entity.fat_goal,
  };
};
