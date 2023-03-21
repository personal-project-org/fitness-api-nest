import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../repository/account.repository';
import { DeleteAccountCommand } from './delete-account.command';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand>
{
  constructor(private readonly accountRepository: AccountRepository) {}
  async execute(command: DeleteAccountCommand): Promise<any> {
    const accountDeleteResult = await this.accountRepository.delete(command.id);
    return accountDeleteResult.map(
      (deletedAccount) => deletedAccount,
      () => new RepositoryDeleteError(),
    );
  }
}

export abstract class AccountDeleteErrorResponse extends Error {}

export class RepositoryDeleteError extends AccountDeleteErrorResponse {}
