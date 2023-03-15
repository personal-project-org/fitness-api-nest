import { Set } from '../local-model/set.entity';
import { SetObjectType } from './set.object-type';

export const mapDomainEntityToGqlObjectType = (entity: Set): SetObjectType => {
  return {
    id: entity.id,
    reps: entity.reps,
    weight: entity.weight,
    date: entity.date,
    exerciseId: entity.exerciseId,
  };
};
