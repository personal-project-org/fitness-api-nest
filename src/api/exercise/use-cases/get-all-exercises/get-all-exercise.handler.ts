import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetAllExerciseCommand } from './get-all-exercise.command';
import { ExerciseRepository } from '../../repository/exercise.repository';
import { Exercise } from '../../entities/local-model/exercise.entity';
import { Result } from '@badrap/result';

@CommandHandler(GetAllExerciseCommand)
export class GetAllExerciseHandler
  implements ICommandHandler<GetAllExerciseCommand>
{
  constructor(private readonly exerciseRepository: ExerciseRepository) {}
  async execute(
    command: GetAllExerciseCommand,
  ): Promise<Result<Exercise[], GetAllRepositoryError>> {
    const getAllExerciseResult =
      await this.exerciseRepository.getAllExercises();

    return getAllExerciseResult.map(
      (allExercises) => allExercises,
      () => new GetAllRepositoryError(),
    );
  }
}

export abstract class GetAllExerciseErrorResponse extends Error {}

export class GetAllRepositoryError extends GetAllExerciseErrorResponse {}
