import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../repository/Account.repository';
import { DeleteAccountCommand } from './delete-Account.command';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand>
{
  constructor(private readonly accountRepository: AccountRepository) {}
  async execute(command: DeleteAccountCommand): Promise<any> {
    const accountDeleteResult = await this.accountRepository.delete(command.id);
    return accountDeleteResult.map(
      (deletedCount) => deletedCount,
      () => new RepositoryDeleteError(),
    );
  }
}

export abstract class AccountDeleteErrorResponse extends Error {}

export class RepositoryDeleteError extends AccountDeleteErrorResponse {}
