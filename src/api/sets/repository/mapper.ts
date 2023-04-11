import { Set as SetsPrisma } from '@prisma/client';
import { Set } from '../entities/local-model/set.entity';

export const mapDbEntityToDomainEntity = (entity: SetsPrisma): Set => {
  return new Set(
    entity.id,
    entity.reps,
    entity.exerciseId,
    entity.accountId,
    entity.weight,
    entity.date,
  );
};
