import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AccountRepository,
  AccountUpdateRequestData,
} from '../../repository/account.repository';
import { UpdateAccountCommand } from './update-account.command';
import { Result } from '@badrap/result';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand>
{
  constructor(private readonly accountRepository: AccountRepository) {}
  async execute(command: UpdateAccountCommand): Promise<any> {
    const desiredAccountToUpdate = await this.accountRepository.findById(
      command.id,
    );

    if (desiredAccountToUpdate.isErr) {
      return Result.err(new NoRecordAvailable());
    }

    const accountUpdateResult = await this.accountRepository.update({
      id: command.id,
      username: command.username,
      password: command.password,
      calorie_goal: command.calorie_goal,
      protein_goal: command.protein_goal,
      carb_goal: command.carb_goal,
      fat_goal: command.fat_goal,
    } as AccountUpdateRequestData);

    return accountUpdateResult.map(
      (updatedAccount) => updatedAccount,
      () => new RepositoryUpdateError(),
    );
  }
}

export abstract class AccountUpdateErrorResponse extends Error {}

export class RepositoryUpdateError extends AccountUpdateErrorResponse {}

export class NoRecordAvailable extends AccountUpdateErrorResponse {}
