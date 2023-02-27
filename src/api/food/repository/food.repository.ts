import { Result } from '@badrap/result';
import { Injectable, Logger } from '@nestjs/common';
import { Food } from 'src/api/food/entities/local-model/food.entity';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { mapDbEntityToDomainEntity } from './mapper';

@Injectable()
export class FoodRepository {
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
  async getAllFoods(): Promise<Result<Food[], FoodRepositoryErrorResponse>> {
    try {
      const entity = await this.prisma.food.findMany({});

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

  async deleteMany(
    ids: string[],
  ): Promise<Result<Number, FoodRepositoryErrorResponse>> {
    try {
      const deletedEntityCount = await this.prisma.food.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      if (deletedEntityCount) {
        return Result.ok(deletedEntityCount.count);
      }

      return Result.err(new InvalidState());
    } catch (e) {
      this.logger.error(e);
      return Result.err(new UnknownError());
    }
  }

  async update(
    foodUpdateRequestData: FoodUpdateRequestData,
  ): Promise<Result<Food, FoodRepositoryErrorResponse>> {
    try {
      const newFood = (({ id, ...others }) => others)(
        foodUpdateRequestData,
      ) as Food;
      const updatedEntity = await this.prisma.food.update({
        where: {
          id: foodUpdateRequestData.id,
        },
        data: {
          ...newFood,
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
}

export interface FoodCreateRequest {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

export interface FoodUpdateRequestData {
  id: string;
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

export abstract class FoodRepositoryErrorResponse extends Error {}

export class InvalidState extends FoodRepositoryErrorResponse {}

export class UnknownError extends FoodRepositoryErrorResponse {}
