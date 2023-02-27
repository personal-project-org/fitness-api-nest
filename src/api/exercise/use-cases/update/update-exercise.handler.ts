import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateExerciseCommand } from './update-exercise.command';
import {
  ExerciseRepository,
  ExerciseUpdateRequestData,
} from '../../repository/exercise.repository';

@CommandHandler(UpdateExerciseCommand)
export class UpdateExerciseHandler
  implements ICommandHandler<UpdateExerciseCommand>
{
  constructor(private readonly exerciseRepository: ExerciseRepository) {}
  async execute(command: UpdateExerciseCommand): Promise<any> {
    const exerciseUpdateResult = await this.exerciseRepository.update({
      id: command.id,
      name: command.name,
      type: command.type,
      body_part: command.body_part,
      reps: command.reps,
      weight: command.weight,
    } as ExerciseUpdateRequestData);

    return exerciseUpdateResult.map(
      (updatedExercise) => updatedExercise,
      () => new RepositoryUpdateError(),
    );
  }
}

export abstract class ExerciseUpdateErrorResponse extends Error {}

export class RepositoryUpdateError extends ExerciseUpdateErrorResponse {}
