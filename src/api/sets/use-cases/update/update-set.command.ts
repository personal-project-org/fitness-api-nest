import { Result } from '@badrap/result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SetRepository,
  SetUpdateRequestData,
} from '../../repository/set.repository';
import { UpdateSetCommand } from './update-set.handler';

@CommandHandler(UpdateSetCommand)
export class UpdateSetHandler implements ICommandHandler<UpdateSetCommand> {
  constructor(private readonly setRepository: SetRepository) {}
  async execute(command: UpdateSetCommand): Promise<any> {
    const desiredSetToUpdate = await this.setRepository.findById(command.id);

    if (desiredSetToUpdate.isErr) {
      return Result.err(new NoRecordAvailable());
    }

    const setUpdateResult = await this.setRepository.update({
      id: command.id,
      reps: command.reps,
      weight: command.weight,
      date: command.date,
      exerciseId: command.exerciseId,
    } as SetUpdateRequestData);

    return setUpdateResult.map(
      (updatedSet) => updatedSet,
      () => new RepositoryUpdateError(),
    );
  }
}

export abstract class UpdateSetErrorResponse extends Error {}

export class RepositoryUpdateError extends UpdateSetErrorResponse {}

export class NoRecordAvailable extends UpdateSetErrorResponse {}
