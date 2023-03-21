import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../repository/account.repository';
import { GetAllAccountsCommand } from './get-all-accounts.command';

@QueryHandler(GetAllAccountsCommand)
export class GetAllAccountsHandler
  implements IQueryHandler<GetAllAccountsCommand>
{
  constructor(private readonly accountRepository: AccountRepository) {}
  async execute(): Promise<any> {
    const getAllAccountResult = await this.accountRepository.getAllAccounts();
    return getAllAccountResult.map(
      (allAccount) => allAccount,
      () => new RepositoryGetAllError(),
    );
  }
}

export abstract class GetAllAccountErrorResponse extends Error {}

export class RepositoryGetAllError extends GetAllAccountErrorResponse {}
