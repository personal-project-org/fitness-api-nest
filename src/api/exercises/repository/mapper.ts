import { Exercise as ExerciseItems } from '@prisma/client';
import { Exercise } from '../entities/local-model/exercise.entity';

export const mapDbEntityToDomainEntity = (entity: ExerciseItems): Exercise => {
  return new Exercise(entity.id, entity.name, entity.type, entity.body_part);
};
