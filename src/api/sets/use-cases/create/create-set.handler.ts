import { Result } from '@badrap/result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SetCreateRequest,
  SetRepository,
} from '../../repository/set.repository';
import { CreateSetCommand } from './create-set.command';
import { Set } from '@prisma/client';
import { ExerciseRepository } from '../../../../api/exercises/repository/exercise.repository';
import { AccountRepository } from '../../../../api/accounts/repository/account.repository';

@CommandHandler(CreateSetCommand)
export class CreateSetHandler implements ICommandHandler<CreateSetCommand> {
  constructor(
    private readonly setRepository: SetRepository,
    private readonly exerciseRepository: ExerciseRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(
    command: CreateSetCommand,
  ): Promise<Result<Set, SetCreateErrorResponse>> {
    const findAccountResult = await this.accountRepository.findById(
      command.accountId,
    );

    if (findAccountResult.isErr) {
      return Result.err(new AccountNotFoundError());
    }

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
      accountId: command.accountId,
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

export class AccountNotFoundError extends SetCreateErrorResponse {}
