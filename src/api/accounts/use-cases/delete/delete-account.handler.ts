import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../repository/account.repository';
import { DeleteAccountCommand } from './delete-account.command';
import * as bcrypt from 'bcrypt';
import { Result } from '@badrap/result';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand>
{
  constructor(private readonly accountRepository: AccountRepository) {}
  async execute(command: DeleteAccountCommand): Promise<any> {
    const desiredAccountToUpdate = await this.accountRepository.findById(
      command.id,
    );

    if (desiredAccountToUpdate.isErr) {
      return Result.err(new NoRecordAvailable());
    }
    const isValidPassword = await bcrypt.compare(
      command.password,
      desiredAccountToUpdate.unwrap().password,
    );

    if (!isValidPassword) {
      return Result.err(new InvalidPassword());
    }
    const accountDeleteResult = await this.accountRepository.delete(command.id);
    return accountDeleteResult.map(
      (deletedAccount) => deletedAccount,
      () => {
        return new RepositoryDeleteError();
      },
    );
  }
}

export abstract class AccountDeleteErrorResponse extends Error {}

export class RepositoryDeleteError extends AccountDeleteErrorResponse {}

export class InvalidPassword extends AccountDeleteErrorResponse {}

export class NoRecordAvailable extends AccountDeleteErrorResponse {}
