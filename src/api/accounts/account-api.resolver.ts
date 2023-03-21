import { Result } from '@badrap/result';
import { InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './entities/local-model/account.entity';
import { AccountObjectType } from './entities/gql-models/account.object-type';
import { CreateAccountInput } from './entities/gql-models/create.account-input';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import { CreateAccountCommand } from './use-cases/create/create-account.command';
import { AccountCreateErrorResponse } from './use-cases/create/create-account.handler';
import * as bcrypt from 'bcrypt';
import { GetAllAccountsCommand } from './use-cases/get-all-accounts/get-all-accounts.command';
import { GetAllAccountsErrorResponse } from './use-cases/get-all-accounts/get-all-accounts.handler';
import { UpdateAccountInput } from './entities/gql-models/update.account-input';
import { UpdateAccountCommand } from './use-cases/update/update-account.command';
import { AccountUpdateErrorResponse } from './use-cases/update/update-account.handler';
import { DeleteAccountCommand } from './use-cases/delete/delete-account.command';
import { AccountDeleteErrorResponse } from './use-cases/delete/delete-account.handler';
import { DeleteAccountInput } from './entities/gql-models/delete.account-input';

@Resolver((_of) => AccountObjectType)
export class AccountResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation((_returns) => AccountObjectType, {
    name: 'createAccount',
    description: 'Registers a new user account.',
  })
  async createAccount(
    @Args('input') input: CreateAccountInput,
  ): Promise<AccountObjectType> {
    const salt = 10;
    const hashedPw = await bcrypt.hash(input.password, salt);
    const result = await this.commandBus.execute<
      CreateAccountCommand,
      Result<Account, AccountCreateErrorResponse>
    >(
      new CreateAccountCommand(
        input.username,
        hashedPw,
        input.calorie_goal,
        input.protein_goal,
        input.carb_goal,
        input.fat_goal,
      ),
    );

    return result
      .map(
        (account) => mapDomainEntityToGqlObjectType(account),
        (err) => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Query((_returns) => [AccountObjectType], { name: 'getAllAccounts' })
  async getAllAccounts(): Promise<AccountObjectType[]> {
    const result = await this.queryBus.execute<
      GetAllAccountsCommand,
      Result<Account[], GetAllAccountsErrorResponse>
    >(new GetAllAccountsCommand());
    return result
      .map(
        (allAccounts) => {
          return allAccounts.map((account) =>
            mapDomainEntityToGqlObjectType(account),
          );
        },
        () => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation((_returns) => AccountObjectType, {
    name: 'updateAccount',
    description: 'Updates an account.',
  })
  async updateAccount(
    @Args('input') input: UpdateAccountInput,
  ): Promise<AccountObjectType> {
    const result = await this.commandBus.execute<
      UpdateAccountCommand,
      Result<Account, AccountUpdateErrorResponse>
    >(
      new UpdateAccountCommand(
        input.id,
        input.username,
        input.password,
        input.calorie_goal,
        input.protein_goal,
        input.carb_goal,
        input.fat_goal,
      ),
    );

    return result
      .map(
        (account) => mapDomainEntityToGqlObjectType(account),
        (err) => {
          // if (err instanceof NoRecordAvailable) {
          //   return new NotFoundException(
          //     "The account item you're trying to update does not exist.",
          //   );
          // }
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation((_returns) => AccountObjectType, {
    name: 'deleteAccount',
    description: 'Deletes a user account.',
  })
  async deleteAccount(@Args('input') input: DeleteAccountInput): Promise<any> {
    const result = await this.commandBus.execute<
      DeleteAccountCommand,
      Result<Account, AccountDeleteErrorResponse>
    >(new DeleteAccountCommand(input.id));

    return result
      .map((account) => {
        return account;
      })
      .unwrap();
  }
}
