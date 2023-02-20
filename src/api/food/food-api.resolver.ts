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
import { DeleteFoodCommand } from './use-cases/delete/delete-food.command';
import { FoodDeleteErrorResponse } from './use-cases/delete/delete-food.handler';
import { GetAllFoodCommand } from './use-cases/get-all-foods/get-all.command';
import { DeleteFoodInput } from './entities/gql-models/delete.food-input';

@Resolver((_of) => FoodObjectType)
export class FoodResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query((_returns) => [FoodObjectType], {
    name: 'getAllFoods',
  })
  async getAllFoods(): Promise<FoodObjectType[]> {
    const result = await this.queryBus.execute<
      GetAllFoodCommand,
      Result<Food[], FoodDeleteErrorResponse>
    >(new GetAllFoodCommand());

    return result
      .map((foodArray) => {
        return foodArray.map((food) => mapDomainEntityToGqlObjectType(food));
      })
      .unwrap();
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

  @Mutation((_returns) => Number, {
    name: 'deleteFoods',
    description: 'Removes foods given an array of ids.',
  })
  async deleteFoods(@Args('input') input: DeleteFoodInput): Promise<any> {
    const result = await this.commandBus.execute<
      DeleteFoodCommand,
      Result<Number, FoodDeleteErrorResponse>
    >(new DeleteFoodCommand(input.ids));

    return result
      .map((food) => {
        return food > 0 ? food : new InternalServerErrorException();
      })
      .unwrap();
  }
}
