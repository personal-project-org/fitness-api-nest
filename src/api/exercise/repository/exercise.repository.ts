import { Result } from '@badrap/result';
import { Injectable, Logger } from '@nestjs/common';
import { Exercise } from '../entities/local-model/exercise.entity';

@Injectable()
export class ExerciseRepository {
  private readonly logger = new Logger(ExerciseRepository.name);

  async create(
    req: ExerciseCreateRequest,
  ): Promise<Result<Exercise, ExerciseRepositoryErrorResponse>> {
    return Result.err();
  }

  async getAllExercises(): Promise<
    Result<Exercise[], ExerciseRepositoryErrorResponse>
  > {
    return Result.err();
  }

  async update(
    req: ExerciseUpdateRequest,
  ): Promise<Result<Exercise, ExerciseRepositoryErrorResponse>> {
    return Result.err();
  }

  async delete(
    id: string[],
  ): Promise<Result<Exercise, ExerciseRepositoryErrorResponse>> {
    return Result.err();
  }
}

export interface ExerciseCreateRequest {
  name: String;
  type: String;
  body_part: String;
  reps: Number[];
  weight: Number[];
}

export interface ExerciseUpdateRequest {
  id: String;
  name: String;
  type: String;
  body_part: String;
  reps: Number[];
  weight: Number[];
}

export abstract class ExerciseRepositoryErrorResponse extends Error {}

export class InvalidState extends ExerciseRepositoryErrorResponse {}

export class UnknownError extends ExerciseRepositoryErrorResponse {}
