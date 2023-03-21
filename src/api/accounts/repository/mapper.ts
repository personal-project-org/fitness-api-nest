import { Account as AccountItem } from '@prisma/client';
import { Account } from '../entities/local-model/account.entity';

export const mapDbEntityToDomainEntity = (entity: AccountItem): Account => {
  return new Account(
    entity.id,
    entity.username,
    entity.password,
    entity.calorie_goal,
    entity.protein_goal,
    entity.carb_goal,
    entity.fat_goal,
  );
};
