import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AccountCreateRequest,
  AccountRepository,
  UsernameAlreadyTakenError,
} from '../../repository/account.repository';
import { CreateAccountCommand } from './create-account.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(command: CreateAccountCommand): Promise<any> {
    const accountCreateResult = await this.accountRepository.create({
      username: command.username,
      password: command.password,
      calorie_goal: command.calorie_goal,
      protein_goal: command.protein_goal,
      carb_goal: command.carb_goal,
      fat_goal: command.fat_goal,
    } as AccountCreateRequest);

    return accountCreateResult.map(
      (createdAccount) => createdAccount,
      (err) => {
        if (err instanceof UsernameAlreadyTakenError) {
          return new RepositoryUsernameAlreadyTakenError();
        }
      },
    );
  }
}

export abstract class AccountCreateErrorResponse extends Error {}

export class RepositoryCreationError extends AccountCreateErrorResponse {}

export class RepositoryUsernameAlreadyTakenError extends AccountCreateErrorResponse {}
