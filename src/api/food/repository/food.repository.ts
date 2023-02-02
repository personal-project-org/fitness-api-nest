import { Result } from '@badrap/result';
import { Injectable, Logger } from '@nestjs/common';
import { Food } from 'src/api/food/entities/local-model/food.entity';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { mapDbEntityToDomainEntity } from './mapper';

@Injectable()
export class FoodRepository {
  //Why:
  private readonly logger = new Logger(FoodRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(
    req: FoodCreateRequest,
  ): Promise<Result<Food, FoodRepositoryErrorResponse>> {
    try {
      const entity = await this.prisma.food.create({
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
  getAllFoods(): Promise<Result<Food, FoodRepositoryErrorResponse>> {
    throw new Error('Method not implemented.');
  }
}

export interface FoodCreateRequest {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

export abstract class FoodRepositoryErrorResponse extends Error {}

export class InvalidState extends FoodRepositoryErrorResponse {}

export class UnknownError extends FoodRepositoryErrorResponse {}
