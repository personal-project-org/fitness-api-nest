import { Result } from '@badrap/result';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './entities/local-model/account.entity';
import { AccountObjectType } from './entities/gql-models/account.object-type';
import { CreateAccountInput } from './entities/gql-models/create.account-input';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import { CreateAccountCommand } from './use-cases/create/create-account.command';
import {
  AccountCreateErrorResponse,
  RepositoryUsernameAlreadyTakenError,
} from './use-cases/create/create-account.handler';
import * as bcrypt from 'bcrypt';
import { GetAllAccountsCommand } from './use-cases/get-all-accounts/get-all-accounts.command';
import { GetAllAccountsErrorResponse } from './use-cases/get-all-accounts/get-all-accounts.handler';
import { UpdateAccountInput } from './entities/gql-models/update.account-input';
import { UpdateAccountCommand } from './use-cases/update/update-account.command';
import {
  AccountUpdateErrorResponse,
  InvalidPassword as InvalidPasswordUpdate,
} from './use-cases/update/update-account.handler';
import { DeleteAccountCommand } from './use-cases/delete/delete-account.command';
import {
  AccountDeleteErrorResponse,
  NoRecordAvailable,
  InvalidPassword,
} from './use-cases/delete/delete-account.handler';
import { DeleteAccountInput } from './entities/gql-models/delete.account-input';
import { DailyReportObjectType } from './entities/gql-models/daily-report.object-type';
import { GetDailyReportCommand } from './use-cases/get-daily-report/get-daily-report.command';
import { GetDailyReportErrorResponse } from './use-cases/get-daily-report/get-daily-report.handler';
import { GetDailyReportInput } from './entities/gql-models/get-daily-report.input';

@Resolver(() => AccountObjectType)
export class AccountResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => AccountObjectType, {
    name: 'createAccount',
    description: 'Registers a new user account.',
  })
  async createAccount(
    @Args('input') input: CreateAccountInput,
  ): Promise<AccountObjectType> {
    const salt: number = +process.env.PASSWORD_SALT;
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
          if (err instanceof RepositoryUsernameAlreadyTakenError) {
            return new ConflictException(
              'The username you specified is unavailable.',
            );
          }
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Query(() => DailyReportObjectType, { name: 'getDailyReport' })
  async getDailyReport(
    @Args('input') input: GetDailyReportInput,
  ): Promise<DailyReportObjectType> {
    const result = await this.queryBus.execute<
      GetDailyReportCommand,
      Result<DailyReportObjectType, GetDailyReportErrorResponse>
    >(new GetDailyReportCommand(input.date, input.accountId));

    return result
      .map(
        (dailyReportObject) => {
          return dailyReportObject;
        },
        () => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Query(() => [AccountObjectType], { name: 'getAllAccounts' })
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

  @Mutation(() => AccountObjectType, {
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
        input.new_password,
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
          if (err instanceof InvalidPasswordUpdate) {
            return new UnauthorizedException('Invalid password.');
          } else if (err instanceof NoRecordAvailable) {
            return new NotFoundException(
              "The account you're trying to update does not exist.",
            );
          }
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation(() => AccountObjectType, {
    name: 'deleteAccount',
    description: 'Deletes a user account.',
  })
  async deleteAccount(@Args('input') input: DeleteAccountInput): Promise<any> {
    const result = await this.commandBus.execute<
      DeleteAccountCommand,
      Result<Account, AccountDeleteErrorResponse>
    >(new DeleteAccountCommand(input.id, input.password));

    return result
      .map(
        (account) => {
          return account;
        },
        (err) => {
          if (err instanceof InvalidPassword) {
            return new UnauthorizedException('Invalid password.');
          } else if (err instanceof NoRecordAvailable) {
            return new NotFoundException(
              "The account you're trying to delete does not exist.",
            );
          }
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }
}
