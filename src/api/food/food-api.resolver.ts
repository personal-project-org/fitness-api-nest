import { Result } from '@badrap/result';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFoodInput } from './entities/gql-models/create.food-input';
import { FoodObjectType } from './entities/gql-models/food.object-type';
import { CreateFoodCommand } from 'src/api/food/use-cases/create/create-food.command';
import { Food } from 'src/api/food/entities/local-model/food.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FoodCreateErrorResponse } from 'src/api/food/use-cases/create/create-food.handler';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import { InternalServerErrorException } from '@nestjs/common';

@Resolver((_of) => FoodObjectType)
export class FoodResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => FoodObjectType)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((_returns) => FoodObjectType, {
    name: 'createFood',
    description: 'Logs a new food.',
  })
  async createFood(
    @Args('input') input: CreateFoodInput,
  ): Promise<FoodObjectType> {
    const result = await this.commandBus.execute<
      CreateFoodCommand,
      Result<Food, FoodCreateErrorResponse>
    >(
      new CreateFoodCommand(
        input.name,
        input.calories,
        input.protein,
        input.carbs || null,
        input.fats || null,
      ),
    );

    return result
      .map(
        (food) => mapDomainEntityToGqlObjectType(food),
        (err) => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }
}
