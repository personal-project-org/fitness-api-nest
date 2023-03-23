import { Result } from '@badrap/result';
import { InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CaloricBalanceFactorObjectType } from './entities/gql-models/factor.object-type';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';

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

  //   @Mutation((_returns) => Number, {
  //     name: 'deleteCaloricBalanceFactors',
  //     description:
  //       'Removes many caloricBalanceFactors that match a specified criteria.',
  //   })
  //   async deleteCaloricBalanceFactors(
  //     @Args('input') input: DeleteCaloricBalanceFactorsInput,
  //   ): Promise<any> {
  //     const result = await this.commandBus.execute<
  //       DeleteCaloricBalanceFactorCommand,
  //       Result<Number, CaloricBalanceFactorDeleteErrorResponse>
  //     >(new DeleteCaloricBalanceFactorCommand(input.ids));

  //     return result
  //       .map(
  //         (caloricBalanceFactor) => {
  //           return caloricBalanceFactor;
  //         },
  //         (err) => {
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

  //   @Mutation((_returns) => CaloricBalanceFactorObjectType, {
  //     name: 'createCaloricBalanceFactor',
  //     description: 'Creates a new caloricBalanceFactor.',
  //   })
  //   async createCaloricBalanceFactor(
  //     @Args('input') input: CreateCaloricBalanceFactorInput,
  //   ): Promise<CaloricBalanceFactorObjectType> {
  //     const result = await this.commandBus.execute<
  //       CreateCaloricBalanceFactorCommand,
  //       Result<CaloricBalanceFactor, CaloricBalanceFactorCreateErrorResponse>
  //     >(new CreateCaloricBalanceFactorCommand());

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
}
