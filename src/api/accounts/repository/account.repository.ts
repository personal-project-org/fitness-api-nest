import { Result } from '@badrap/result';
import { Injectable, Logger } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { mapDbEntityToDomainEntity } from './mapper';

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
  name: string;
  type: string;
  body_part: string;
}

export abstract class AccountRepositoryErrorResponse extends Error {}

export class InvalidState extends AccountRepositoryErrorResponse {}

export class UnknownError extends AccountRepositoryErrorResponse {}

export class NotFound extends AccountRepositoryErrorResponse {}
