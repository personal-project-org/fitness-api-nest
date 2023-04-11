import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSetCommand } from './delete-set.command';
import {
  SetRepository,
  SetRepositoryErrorResponse,
} from '../../repository/set.repository';
import { Result } from '@badrap/result';

@CommandHandler(DeleteSetCommand)
export class DeleteSetHandler implements ICommandHandler<DeleteSetCommand> {
  constructor(private readonly setRepository: SetRepository) {}
  async execute(
    command: DeleteSetCommand,
  ): Promise<Result<number, SetRepositoryErrorResponse>> {
    const foodDeleteResult = await this.setRepository.deleteMany(command.ids);
    return foodDeleteResult.map(
      (deletedCount) => deletedCount,
      () => new RepositoryDeleteError(),
    );
  }
}

export abstract class SetDeleteErrorResponse extends Error {}

export class RepositoryDeleteError extends SetDeleteErrorResponse {}
