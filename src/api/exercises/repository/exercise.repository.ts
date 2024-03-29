import { Result } from '@badrap/result';
import { Injectable, Logger } from '@nestjs/common';
import { Exercise } from '../entities/local-model/exercise.entity';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { mapDbEntityToDomainEntity } from './mapper';

@Injectable()
export class ExerciseRepository {
  private readonly logger = new Logger(ExerciseRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(
    req: ExerciseCreateRequest,
  ): Promise<Result<Exercise, ExerciseRepositoryErrorResponse>> {
    try {
      const entity = await this.prisma.exercise.create({
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

  async getAllExercises(): Promise<
    Result<Exercise[], ExerciseRepositoryErrorResponse>
  > {
    try {
      const entity = await this.prisma.exercise.findMany({});

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
    exercisesUpdateRequestData: ExerciseUpdateRequestData,
  ): Promise<Result<Exercise, ExerciseRepositoryErrorResponse>> {
    try {
      const newExercise = (({ id, ...others }) => others)(
        exercisesUpdateRequestData,
      ) as Exercise;
      const updatedEntity = await this.prisma.exercise.update({
        where: {
          id: exercisesUpdateRequestData.id,
        },
        data: {
          ...newExercise,
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
  ): Promise<Result<number, ExerciseRepositoryErrorResponse>> {
    try {
      const deletedEntityCount = await this.prisma.exercise.deleteMany({
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

  async findById(
    id: string,
  ): Promise<Result<Exercise, ExerciseRepositoryErrorResponse>> {
    const entity = await this.prisma.exercise.findUnique({
      where: { id },
    });
    if (entity) {
      return Result.ok(mapDbEntityToDomainEntity(entity));
    }
    return Result.err(new NotFound());
  }
}

export interface ExerciseCreateRequest {
  name: string;
  type: string;
  body_part: string;
}

export interface ExerciseUpdateRequestData {
  id: string;
  name: string;
  type: string;
  body_part: string;
}

export abstract class ExerciseRepositoryErrorResponse extends Error {}

export class InvalidState extends ExerciseRepositoryErrorResponse {}

export class UnknownError extends ExerciseRepositoryErrorResponse {}

export class NotFound extends ExerciseRepositoryErrorResponse {}
