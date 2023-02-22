import { Result } from '@badrap/result';
import { InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateExerciseInput } from '../exercise/entities/gql-models/create.Exercise-input';
import { CreateExerciseCommand } from '../exercise/use-cases/create/create-exercise.command';
import { ExerciseCreateErrorResponse } from '../exercise/use-cases/create/create-Exercise.handler';
import { ExerciseObjectType } from './entities/gql-models/exercise.object-type';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import { UpdateExerciseInput } from './entities/gql-models/update.exercise-input';
import { Exercise } from './entities/local-model/exercise.entity';
import { GetAllExerciseCommand } from './use-cases/get-all-exercises/get-all-exercise.command';
import { GetAllExerciseErrorResponse } from './use-cases/get-all-exercises/get-all-exercise.handler';
import { UpdateExerciseCommand } from './use-cases/update/update-exercise.command';
import { ExerciseUpdateErrorResponse } from './use-cases/update/update-exercise.handler';

@Resolver((_of) => ExerciseObjectType)
export class ExerciseResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation((_returns) => [ExerciseObjectType], {
    name: 'getAllExercise',
    description: 'Returns all exercises.',
  })
  async getAllExercises(): Promise<ExerciseObjectType[]> {
    const result = await this.commandBus.execute<
      GetAllExerciseCommand,
      Result<Exercise[], GetAllExerciseErrorResponse>
    >(new GetAllExerciseCommand());

    return result
      .map(
        (allExercises) =>
          allExercises.map((exercise) =>
            mapDomainEntityToGqlObjectType(exercise),
          ),
        (err) => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation((_returns) => ExerciseObjectType, {
    name: 'updateExercise',
    description: 'Updates an exercise.',
  })
  async updateExercise(
    @Args('input') input: UpdateExerciseInput,
  ): Promise<ExerciseObjectType> {
    const result = await this.commandBus.execute<
      UpdateExerciseCommand,
      Result<Exercise, ExerciseUpdateErrorResponse>
    >(
      new UpdateExerciseCommand(
        input.id,
        input.name,
        input.type,
        input.body_part,
        input.reps,
        input.weight,
      ),
    );

    return result
      .map(
        (exercise) => mapDomainEntityToGqlObjectType(exercise),
        (err) => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation((_returns) => ExerciseObjectType, {
    name: 'createExercise',
    description: 'Creates a new exercise.',
  })
  async createExercise(
    @Args('input') input: CreateExerciseInput,
  ): Promise<ExerciseObjectType> {
    const result = await this.commandBus.execute<
      CreateExerciseCommand,
      Result<Exercise, ExerciseCreateErrorResponse>
    >(
      new CreateExerciseCommand(
        input.name,
        input.type,
        input.body_part,
        input.reps,
        input.weight,
      ),
    );

    return result
      .map(
        (exercise) => mapDomainEntityToGqlObjectType(exercise),
        (err) => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }
}
