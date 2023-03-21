import { Result } from '@badrap/result';
import { Injectable, Logger } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { mapDbEntityToDomainEntity } from './mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountRepository {
  private readonly logger = new Logger(AccountRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(
    req: AccountCreateRequest,
  ): Promise<Result<Account, AccountRepositoryErrorResponse>> {
    try {
      const entity = await this.prisma.account.create({
        data: req,
      });

      if (entity) {
        return Result.ok(mapDbEntityToDomainEntity(entity));
      }

      return Result.err(new InvalidState());
    } catch (e) {
      this.logger.error(e);
      return Result.err(new UnknownError());
    }
  }

  async getAllAccounts(): Promise<
    Result<Account[], AccountRepositoryErrorResponse>
  > {
    try {
      const entity = await this.prisma.account.findMany({});

      if (entity) {
        return Result.ok(
          entity.map((single) => mapDbEntityToDomainEntity(single)),
        );
      }

      return Result.err(new InvalidState());
    } catch (e) {
      this.logger.error(e);
      return Result.err(new UnknownError());
    }
  }

  async update(
    accountUpdateRequestData: AccountUpdateRequestData,
  ): Promise<Result<Account, AccountRepositoryErrorResponse>> {
    try {
      const salt: number = +process.env.PASSWORD_SALT;
      const hashedNewPw = await bcrypt.hash(
        accountUpdateRequestData.new_password || '',
        salt,
      );

      console.log('within update: ', hashedNewPw);

      const newAccountInfo = accountUpdateRequestData.new_password
        ? ({
            id: accountUpdateRequestData.id,
            username: accountUpdateRequestData.username,
            password: hashedNewPw,
            calorie_goal: accountUpdateRequestData.calorie_goal,
            protein_goal: accountUpdateRequestData.protein_goal,
            carb_goal: accountUpdateRequestData.carb_goal,
            fat_goal: accountUpdateRequestData.fat_goal,
          } as Account)
        : ({
            id: accountUpdateRequestData.id,
            username: accountUpdateRequestData.username,
            calorie_goal: accountUpdateRequestData.calorie_goal,
            protein_goal: accountUpdateRequestData.protein_goal,
            carb_goal: accountUpdateRequestData.carb_goal,
            fat_goal: accountUpdateRequestData.fat_goal,
          } as Account);

      const updatedEntity = await this.prisma.account.update({
        where: {
          id: accountUpdateRequestData.id,
        },
        data: {
          ...newAccountInfo,
        },
      });

      if (updatedEntity) {
        return Result.ok(mapDbEntityToDomainEntity(updatedEntity));
      }
      return Result.err(new InvalidState());
    } catch (e) {
      this.logger.error(e);
      return Result.err(new UnknownError());
    }
  }

  async delete(
    id: string,
  ): Promise<Result<Account, AccountRepositoryErrorResponse>> {
    const entity = await this.prisma.account.delete({
      where: { id },
    });
    if (entity) {
      return Result.ok(mapDbEntityToDomainEntity(entity));
    }
    return Result.err(new NotFound());
  }

  async findById(
    id: string,
  ): Promise<Result<Account, AccountRepositoryErrorResponse>> {
    const entity = await this.prisma.account.findUnique({
      where: { id },
    });
    if (entity) {
      return Result.ok(mapDbEntityToDomainEntity(entity));
    }
    return Result.err(new NotFound());
  }
}

export interface AccountCreateRequest {
  username: string;
  password: string;
  calorie_goal: number;
  protein_goal: number;
  carb_goal: number;
  fat_goal: number;
}

export interface AccountUpdateRequestData {
  id: string;
  username: string;
  new_password: string;
  calorie_goal: number;
  protein_goal: number;
  carb_goal: number;
  fat_goal: number;
}

export abstract class AccountRepositoryErrorResponse extends Error {}

export class InvalidState extends AccountRepositoryErrorResponse {}

export class UnknownError extends AccountRepositoryErrorResponse {}

export class NotFound extends AccountRepositoryErrorResponse {}
