import { Result } from '@badrap/result';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSetInput } from './entities/gql-models/create.set-input';
import { SetObjectType } from './entities/gql-models/set.object-type';
import { CreateSetCommand } from './use-cases/create/create-set.command';
import {
  AccountNotFoundError,
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
import { UpdateSetCommand } from './use-cases/update/update-set.handler';
import { UpdateSetErrorResponse } from './use-cases/update/update-set.command';
import { UpdateSetInput } from './entities/gql-models/update.set-input';
import { DeleteSetCommand } from './use-cases/delete/delete-set.command';
import { SetDeleteErrorResponse } from './use-cases/delete/delete-set.handler';
import { DeleteSetInput } from './entities/gql-models/delete.set-input';

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
        input.accountId,
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
          } else if (err instanceof AccountNotFoundError) {
            return new NotFoundException(
              'The account ID you specified is invalid.',
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

  @Mutation((_returns) => SetObjectType, { name: 'updateSet' })
  async updateSet(
    @Args('input') input: UpdateSetInput,
  ): Promise<SetObjectType> {
    const updatedSet = await this.commandBus.execute<
      UpdateSetCommand,
      Result<Set, UpdateSetErrorResponse>
    >(
      new UpdateSetCommand(
        input.id,
        input.reps,
        input.weight,
        input.date,
        input.exerciseId,
      ),
    );

    return updatedSet
      .map(
        (updatedSet) => {
          return mapDomainEntityToGqlObjectType(updatedSet);
        },
        () => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation((_returns) => Number, { name: 'deleteSets' })
  async deleteSets(@Args('input') input: DeleteSetInput): Promise<Number> {
    const deletedSet = await this.commandBus.execute<
      DeleteSetCommand,
      Result<Number, SetDeleteErrorResponse>
    >(new DeleteSetCommand(input.ids));

    return deletedSet
      .map(
        (deletedSetCount) => {
          return deletedSetCount;
        },
        () => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }
}
