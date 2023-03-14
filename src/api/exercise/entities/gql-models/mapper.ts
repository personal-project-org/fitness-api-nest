import { Exercise } from '../local-model/exercise.entity';
import { ExerciseObjectType } from './exercise.object-type';

export const mapDomainEntityToGqlObjectType = (
  entity: Exercise,
): ExerciseObjectType => {
  return {
    id: entity.id,
    name: entity.name,
    type: entity.type,
    body_part: entity.body_part,
  };
};
