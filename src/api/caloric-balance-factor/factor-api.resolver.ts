import { Result } from '@badrap/result';
import {
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CaloricBalanceFactor } from '@prisma/client';
import { isInstance } from 'class-validator';
import { CreateCaloricBalanceFactorInput } from './entities/gql-models/create.factor-input';
import { DeleteCaloricBalanceFactorsInput } from './entities/gql-models/delete-many.factors-input';
import { CaloricBalanceFactorObjectType } from './entities/gql-models/factor.object-type';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import { CreateCaloricBalanceFactorCommand } from './use-cases/create/create-factor.command';
import { CaloricBalanceFactorCreateErrorResponse } from './use-cases/create/create-factor.handler';
import { DeleteCaloricBalanceFactorCommand } from './use-cases/delete/delete-factor.command';
import {
  CaloricBalanceFactorDeleteErrorResponse,
  ForbiddenDeleteError,
  RepositoryDeleteError,
} from './use-cases/delete/delete-factor.handler';

@Resolver((_of) => CaloricBalanceFactorObjectType)
export class CaloricBalanceFactorResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  //   @Query((_returns) => [CaloricBalanceFactorObjectType], {
  //     name: 'getAllCaloricBalanceFactors',
  //   })
  //   async getAllCaloricBalanceFactors(): Promise<
  //     CaloricBalanceFactorObjectType[]
  //   > {
  //     const result = await this.queryBus.execute<
  //       GetAllCaloricBalanceFactorsCommand,
  //       Result<CaloricBalanceFactor[], GetAllCaloricBalanceFactorErrorResponse>
  //     >(new GetAllCaloricBalanceFactorCommand());
  //     return result
  //       .map(
  //         (allCaloricBalanceFactors) => {
  //           return allCaloricBalanceFactors.map((caloricBalanceFactor) =>
  //             mapDomainEntityToGqlObjectType(caloricBalanceFactor),
  //           );
  //         },
  //         () => {
  //           return new InternalServerErrorException();
  //         },
  //       )
  //       .unwrap();
  //   }

  //   @Mutation((_returns) => CaloricBalanceFactorObjectType, {
  //     name: 'updateCaloricBalanceFactor',
  //     description: 'Updates an caloricBalanceFactor.',
  //   })
  //   async updateCaloricBalanceFactor(
  //     @Args('input') input: UpdateCaloricBalanceFactorInput,
  //   ): Promise<CaloricBalanceFactorObjectType> {
  //     const result = await this.commandBus.execute<
  //       UpdateCaloricBalanceFactorCommand,
  //       Result<CaloricBalanceFactor, CaloricBalanceFactorUpdateErrorResponse>
  //     >(new UpdateCaloricBalanceFactorCommand());

  //     return result
  //       .map(
  //         (caloricBalanceFactor) =>
  //           mapDomainEntityToGqlObjectType(caloricBalanceFactor),
  //         (err) => {
  //           return new InternalServerErrorException();
  //         },
  //       )
  //       .unwrap();
  //   }

  @Mutation((_returns) => CaloricBalanceFactorObjectType, {
    name: 'createCaloricBalanceFactor',
    description: 'Creates a new caloricBalanceFactor.',
  })
  async createCaloricBalanceFactor(
    @Args('input') input: CreateCaloricBalanceFactorInput,
  ): Promise<CaloricBalanceFactorObjectType> {
    const result = await this.commandBus.execute<
      CreateCaloricBalanceFactorCommand,
      Result<CaloricBalanceFactor, CaloricBalanceFactorCreateErrorResponse>
    >(
      new CreateCaloricBalanceFactorCommand(
        input.accountId,
        input.date,
        input.balanceFactorType,
        input.exerciseId,
        input.caloriesBurned,
        input.caloriesConsumed,
        input.protein,
        input.carbs,
        input.fat,
      ),
    );

    return result
      .map(
        (caloricBalanceFactor) =>
          mapDomainEntityToGqlObjectType(caloricBalanceFactor),
        (err) => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation((_returns) => Number, {
    name: 'deleteCaloricBalanceFactors',
    description:
      'Removes many caloricBalanceFactors that match a specified criteria.',
  })
  async deleteCaloricBalanceFactors(
    @Args('input') input: DeleteCaloricBalanceFactorsInput,
  ): Promise<any> {
    const result = await this.commandBus.execute<
      DeleteCaloricBalanceFactorCommand,
      Result<Number, CaloricBalanceFactorDeleteErrorResponse>
    >(new DeleteCaloricBalanceFactorCommand(input.accountId, input.ids));

    return result
      .map(
        (deleteAmount) => {
          return deleteAmount;
        },
        (err) => {
          if (err instanceof RepositoryDeleteError) {
            return new InternalServerErrorException();
          } else if (err instanceof ForbiddenDeleteError) {
            return new ForbiddenException(
              "Can't delete a caloricBalanceFactor belonging to a different account.",
            );
          }
        },
      )
      .unwrap();
  }
}
