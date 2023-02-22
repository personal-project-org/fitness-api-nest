import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExerciseRepository } from '../../repository/exercise.repository';
import { DeleteExerciseCommand } from './delete-exercises.command';

@CommandHandler(DeleteExerciseCommand)
export class DeleteExerciseHandler
  implements ICommandHandler<DeleteExerciseCommand>
{
  constructor(private readonly exerciseRepository: ExerciseRepository) {}
  async execute(command: DeleteExerciseCommand): Promise<any> {
    const exerciseDeleteResult = await this.exerciseRepository.deleteMany(
      command.ids,
    );
    return exerciseDeleteResult.map(
      (deletedCount) => deletedCount,
      () => new RepositoryDeleteError(),
    );
  }
}

export abstract class ExerciseDeleteErrorResponse extends Error {}

export class RepositoryDeleteError extends ExerciseDeleteErrorResponse {}
