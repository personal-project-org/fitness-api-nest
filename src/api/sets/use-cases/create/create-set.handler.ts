import { Result } from '@badrap/result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SetCreateRequest,
  SetRepository,
} from '../../repository/set.repository';
import { CreateSetCommand } from './create-set.command';
import { Set } from '@prisma/client';
import { ExerciseRepository } from '../../../../api/exercises/repository/exercise.repository';

@CommandHandler(CreateSetCommand)
export class CreateSetHandler implements ICommandHandler<CreateSetCommand> {
  constructor(
    private readonly setRepository: SetRepository,
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  async execute(
    command: CreateSetCommand,
  ): Promise<Result<Set, SetCreateErrorResponse>> {
    const findExerciseResult = await this.exerciseRepository.findById(
      command.exerciseId,
    );

    if (findExerciseResult.isErr) {
      return Result.err(new ExerciseNotFoundError());
    }

    const setCreateResult = await this.setRepository.create({
      reps: command.reps,
      weight: command.weight,
      date: command.date,
      exerciseId: command.exerciseId,
    } as SetCreateRequest);

    return setCreateResult.map(
      (createdSet) => createdSet,
      () => new RepositoryCreationError(),
    );
  }
}

export abstract class SetCreateErrorResponse extends Error {}

export class RepositoryCreationError extends SetCreateErrorResponse {}

export class ExerciseNotFoundError extends SetCreateErrorResponse {}
