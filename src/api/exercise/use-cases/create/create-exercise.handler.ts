import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ExerciseCreateRequest,
  ExerciseRepository,
} from '../../repository/exercise.repository';
import { CreateExerciseCommand } from './create-exercise.command';

@CommandHandler(CreateExerciseCommand)
export class CreateExerciseHandler
  implements ICommandHandler<CreateExerciseCommand>
{
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async execute(command: CreateExerciseCommand): Promise<any> {
    const exerciseCreateResult = await this.exerciseRepository.create({
      name: command.name,
      type: command.type,
      body_part: command.body_part,
      reps: command.reps,
      weight: command.weight,
    } as ExerciseCreateRequest);

    return exerciseCreateResult.map(
      (createdExercise) => createdExercise,
      () => new RepositoryCreationError(),
    );
  }
}

export abstract class ExerciseCreateErrorResponse extends Error {}

export class RepositoryCreationError extends ExerciseCreateErrorResponse {}
