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
    const result = await this.commandBus.execute<
      CreateAccountCommand,
      Result<Account, AccountCreateErrorResponse>
    >(
      new CreateAccountCommand(
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
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }
}
