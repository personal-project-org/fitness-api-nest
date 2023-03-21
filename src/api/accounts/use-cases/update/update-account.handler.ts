import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
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

    const isValidPassword = await bcrypt.compare(
      command.password,
      desiredAccountToUpdate.unwrap().password,
    );

    if (!isValidPassword) {
      return Result.err(new InvalidPassword());
    }

    if (desiredAccountToUpdate.isErr) {
      return Result.err(new NoRecordAvailable());
    }

    const newAccountInformation = (({ password, ...others }) => others)(
      command,
    ) as AccountUpdateRequestData;

    const accountUpdateResult = await this.accountRepository.update({
      ...newAccountInformation,
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

export class InvalidPassword extends AccountUpdateErrorResponse {}
