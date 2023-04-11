import { Result } from '@badrap/result';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Set } from '../entities/local-model/set.entity';
import { mapDbEntityToDomainEntity } from './mapper';

@Injectable()
export class SetRepository {
  private readonly logger = new Logger(SetRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(
    req: SetCreateRequest,
  ): Promise<Result<Set, SetRepositoryErrorResponse>> {
    try {
      const entity = await this.prisma.set.create({
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

  async getAllSets(): Promise<Result<Set[], SetRepositoryErrorResponse>> {
    try {
      const entity = await this.prisma.set.findMany({});

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
    setUpdateRequestData: SetUpdateRequestData,
  ): Promise<Result<Set, SetRepositoryErrorResponse>> {
    try {
      const newSet = (({ id, ...others }) => others)(
        setUpdateRequestData,
      ) as Set;
      const updatedEntity = await this.prisma.set.update({
        where: {
          id: setUpdateRequestData.id,
        },
        data: {
          ...newSet,
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

  async deleteMany(
    id: string[],
  ): Promise<Result<number, SetRepositoryErrorResponse>> {
    try {
      const deletedEntityCount = await this.prisma.set.deleteMany({
        where: {
          id: {
            in: id,
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

  async findById(id: string): Promise<Result<Set, SetRepositoryErrorResponse>> {
    const entity = await this.prisma.set.findUnique({
      where: { id },
    });
    if (entity) {
      return Result.ok(mapDbEntityToDomainEntity(entity));
    }
    return Result.err(new NotFound());
  }
}

export interface SetCreateRequest {
  reps: number;
  weight: number;
  date: Date;
  exerciseId: string;
  accountId: string;
}

export interface SetUpdateRequestData {
  id: string;
  reps: number;
  weight: number;
  date: Date;
  exerciseId: string;
}

export abstract class SetRepositoryErrorResponse extends Error {}

export class InvalidState extends SetRepositoryErrorResponse {}

export class UnknownError extends SetRepositoryErrorResponse {}

export class NotFound extends SetRepositoryErrorResponse {}
