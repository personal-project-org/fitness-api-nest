import { Result } from '@badrap/result';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSetInput } from './entities/gql-models/create.set-input';
import { SetObjectType } from './entities/gql-models/set.object-type';
import { CreateSetCommand } from './use-cases/create/create-set.command';
import {
  ExerciseNotFoundError,
  SetCreateErrorResponse,
} from './use-cases/create/create-set.handler';
import { Set } from './entities/local-model/set.entity';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import {
  Get,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GetAllSetsCommand } from './use-cases/get-all-sets/get-all-sets.command';
import { GetAllSetsErrorResponse } from './use-cases/get-all-sets/get-all-sets.handler';

@Resolver((_of) => SetObjectType)
export class SetResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation((_returns) => SetObjectType, {
    name: 'createSet',
    description: 'Logs a new set of any given exercise.',
  })
  async createSet(
    @Args('input') input: CreateSetInput,
  ): Promise<SetObjectType> {
    const createResult = await this.commandBus.execute<
      CreateSetCommand,
      Result<Set, SetCreateErrorResponse>
    >(
      new CreateSetCommand(
        input.reps,
        input.weight,
        input.date,
        input.exerciseId,
      ),
    );

    return createResult
      .map(
        (set) => {
          return mapDomainEntityToGqlObjectType(set);
        },
        (err) => {
          if (err instanceof ExerciseNotFoundError) {
            return new NotFoundException(
              'The exercise ID you specified is invalid.',
            );
          }
        },
      )
      .unwrap();
  }

  @Query((_returns) => [SetObjectType], { name: 'getAllSets' })
  async getAllSets(): Promise<SetObjectType[]> {
    const result = await this.queryBus.execute<
      GetAllSetsCommand,
      Result<Set[], GetAllSetsErrorResponse>
    >(new GetAllSetsCommand());

    return result
      .map(
        (allSets) => {
          return allSets.map((set) => mapDomainEntityToGqlObjectType(set));
        },
        () => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }
}
