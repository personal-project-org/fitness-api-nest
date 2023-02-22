import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetAllExerciseCommand } from './get-all-exercise.command';
import { ExerciseRepository } from '../../repository/exercise.repository';

@CommandHandler(GetAllExerciseCommand)
export class UpdateExerciseHandler
  implements ICommandHandler<GetAllExerciseCommand>
{
  constructor(private readonly exerciseRepository: ExerciseRepository) {}
  async execute(command: GetAllExerciseCommand): Promise<any> {
    const exerciseCreateResult =
      await this.exerciseRepository.getAllExercises();

    return exerciseCreateResult.map(
      (allExercises) => allExercises,
      () => new GetAllRepositoryError(),
    );
  }
}

export abstract class GetAllExerciseErrorResponse extends Error {}

export class GetAllRepositoryError extends GetAllExerciseErrorResponse {}
