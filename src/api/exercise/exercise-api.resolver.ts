import { Result } from '@badrap/result';
import { InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateExerciseInput } from '../Exercise/entities/gql-models/create.Exercise-input';
import { CreateExerciseCommand } from '../Exercise/use-cases/create/create-Exercise.command';
import { ExerciseCreateErrorResponse } from '../Exercise/use-cases/create/create-Exercise.handler';
import { ExerciseObjectType } from './entities/gql-models/exercise.object-type';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import { Exercise } from './entities/local-model/exercise.entity';

@Resolver((_of) => ExerciseObjectType)
export class ExerciseResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation((_returns) => ExerciseObjectType, {
    name: 'createExercise',
    description: 'Creates a new Exercise.',
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
