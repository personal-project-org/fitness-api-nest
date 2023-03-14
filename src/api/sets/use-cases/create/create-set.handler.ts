import { Result } from '@badrap/result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SetCreateRequest,
  SetRepository,
  SetRepositoryErrorResponse,
} from '../../repository/set.repository';
import { CreateSetCommand } from './create-set.command';
import { Set } from '@prisma/client';

@CommandHandler(CreateSetCommand)
export class CreateSetHandler implements ICommandHandler<CreateSetCommand> {
  constructor(private readonly setRepository: SetRepository) {}

  async execute(
    command: CreateSetCommand,
  ): Promise<Result<Set, SetRepositoryErrorResponse>> {
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
