import { Result } from '@badrap/result';
import { InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateExerciseInput } from '../exercise/entities/gql-models/create.exercise-input';
import { CreateExerciseCommand } from '../exercise/use-cases/create/create-exercise.command';
import { ExerciseCreateErrorResponse } from '../exercise/use-cases/create/create-exercise.handler';
import { DeleteExercisesInput } from './entities/gql-models/delete-many.exercise-input';
import { ExerciseObjectType } from './entities/gql-models/exercise.object-type';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import { UpdateExerciseInput } from './entities/gql-models/update.exercise-input';
import { Exercise } from './entities/local-model/exercise.entity';
import { DeleteExerciseCommand } from './use-cases/delete/delete-exercises.command';
import { ExerciseDeleteErrorResponse } from './use-cases/delete/delete-exercises.handler';
import { GetAllExerciseCommand } from './use-cases/get-all-exercises/get-all-exercise.command';
import { GetAllExerciseErrorResponse } from './use-cases/get-all-exercises/get-all-exercise.handler';
import { UpdateExerciseCommand } from './use-cases/update/update-exercise.command';
import { ExerciseUpdateErrorResponse } from './use-cases/update/update-exercise.handler';

@Resolver((_of) => ExerciseObjectType)
export class ExerciseResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query((_returns) => [ExerciseObjectType], { name: 'getAllExercises' })
  async getAllExercises(): Promise<ExerciseObjectType[]> {
    const result = await this.queryBus.execute<
      GetAllExerciseCommand,
      Result<Exercise[], GetAllExerciseErrorResponse>
    >(new GetAllExerciseCommand());
    return result
      .map(
        (allExercises) => {
          return allExercises.map((exercise) =>
            mapDomainEntityToGqlObjectType(exercise),
          );
        },
        () => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation((_returns) => Number, {
    name: 'deleteExercises',
    description: 'Removes many exercises given an array of ids.',
  })
  async deleteExercises(
    @Args('input') input: DeleteExercisesInput,
  ): Promise<any> {
    const result = await this.commandBus.execute<
      DeleteExerciseCommand,
      Result<Number, ExerciseDeleteErrorResponse>
    >(new DeleteExerciseCommand(input.ids));

    return result
      .map((Exercise) => {
        return Exercise;
      })
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
