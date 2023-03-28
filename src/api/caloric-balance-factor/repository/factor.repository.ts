import { Result } from '@badrap/result';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { mapDbEntityToDomainEntity } from './mapper';

@Injectable()
export class CaloricBalanceFactorRepository {
  private readonly logger = new Logger(CaloricBalanceFactorRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(req: CaloricBalanceFactorCreateRequest) {
    try {
      const entity = await this.prisma.caloricBalanceFactor.create({
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

  async update(req: CaloricBalanceFactorUpdateRequest) {
    try {
      const entity = await this.prisma.caloricBalanceFactor.update({
        where: {
          id: req.id,
        },
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

  async getAllCaloricBalanceFactors() {
    try {
      const entities = await this.prisma.caloricBalanceFactor.findMany();
      if (entities) {
        return Result.ok(entities.map(mapDbEntityToDomainEntity));
      }
      return Result.err(new InvalidState());
    } catch (e) {
      this.logger.error(e);
      return Result.err(new UnknownError());
    }
  }

  //anticipating most problems here
  //TODO: Test thoroughly
  async getCaloricBalanceFactors(req: GetCaloricBalanceFactorsRequest) {
    try {
      const entities = await this.prisma.caloricBalanceFactor.findMany({
        where: {
          OR: [
            { id: { in: req.ids } },
            { AND: await this.buildPrismaAndArray(req) },
          ],
        },
      });
      if (entities) {
        return Result.ok(entities.map(mapDbEntityToDomainEntity));
      }
      return Result.err(new InvalidState());
    } catch (e) {
      this.logger.error(e);
      return Result.err(new UnknownError());
    }
  }

  //anticipating most problems here
  //TODO: Test thoroughly
  async deleteCaloricBalanceFactors(req: DeleteCaloricBalanceFactorsRequest) {
    try {
      const entities = await this.prisma.caloricBalanceFactor.deleteMany({
        where: {
          OR: [
            { id: { in: req.ids } },
            { AND: await this.buildPrismaAndArray(req) },
          ],
        },
      });
      if (entities) {
        return Result.ok(entities);
      }
      return Result.err(new InvalidState());
    } catch (e) {
      this.logger.error(e);
      return Result.err(new UnknownError());
    }
  }

  //TODO: Add corresponding handlers and function in resolver
  //Not sure what to do with the batchPayload
  async deleteAllCaloricBalanceFactors() {
    try {
      const entities = await this.prisma.caloricBalanceFactor.deleteMany();
      if (entities) {
        return Result.ok(entities);
      }
      return Result.err(new InvalidState());
    } catch (e) {
      this.logger.error(e);
      return Result.err(new UnknownError());
    }
  }

  async buildPrismaAndArray(
    req: GetCaloricBalanceFactorsRequest,
  ): Promise<any[]> {
    let retVal: [any];

    retVal.push({
      accountId: req.accountId,
    });

    if (req.exerciseId) {
      retVal.push({
        exerciseId: { is: req.exerciseId },
      });
    }
    if (req.startingFrom) {
      retVal.push({
        startingFrom: { is: req.startingFrom },
      });
      retVal.push({
        endingWith: { is: req.endingWith },
      });
    }
    if (req.balanceFactorType) {
      retVal.push({
        balanceFactorType: { is: req.balanceFactorType },
      });
    }

    return retVal;
  }
}

export interface CaloricBalanceFactorCreateRequest {
  accountId: string;
  exerciseId?: string;
  date: Date;
  balanceFactorType: string;
  caloriesBurned?: number;
  caloriesConsumed?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  // foodDetails?: JSON;
  // exerciseDetails?: JSON;
}

export interface CaloricBalanceFactorUpdateRequest {
  id: string;
  exerciseId?: string;
  date?: Date;
  balanceFactorType?: string;
  caloriesBurned?: number;
  caloriesConsumed?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  // foodDetails?: JSON;
  // exerciseDetails?: JSON;
}

export interface GetCaloricBalanceFactorsRequest {
  accountId: string;
  ids?: string[];
  exerciseId?: string;
  startingFrom?: Date;
  endingWith?: Date;
  balanceFactorType?: string;
  // foodDetails?: JSON;
  // exerciseDetails?: JSON;
}

export interface DeleteCaloricBalanceFactorsRequest {
  accountId: string;
  ids: string[];
  exerciseId?: string;
  startingFrom?: Date;
  endingWith?: Date;
  balanceFactorType?: string;
  // foodDetails?: JSON;
  // exerciseDetails?: JSON;
}

export abstract class CaloricBalanceFactorRepositoryErrorResponse extends Error {}

export class InvalidState extends CaloricBalanceFactorRepositoryErrorResponse {}

export class UnknownError extends CaloricBalanceFactorRepositoryErrorResponse {}
