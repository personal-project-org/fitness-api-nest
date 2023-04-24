import { Result } from '@badrap/result';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFoodInput } from './entities/gql-models/create.food-input';
import { FoodObjectType } from './entities/gql-models/food.object-type';
import { CreateFoodCommand } from './use-cases/create/create-food.command';
import { Food } from './entities/local-model/food.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FoodCreateErrorResponse } from './use-cases/create/create-food.handler';
import { mapDomainEntityToGqlObjectType } from './entities/gql-models/mapper';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteFoodCommand } from './use-cases/delete/delete-food.command';
import { FoodDeleteErrorResponse } from './use-cases/delete/delete-food.handler';
import { GetAllFoodCommand } from './use-cases/get-all-foods/get-all.command';
import { DeleteFoodInput } from './entities/gql-models/delete.food-input';
import { UpdateFoodCommand } from './use-cases/update/update-food.command';
import { UpdateFoodInput } from './entities/gql-models/update.food-input';
import { GetAllFoodErrorResponse } from './use-cases/get-all-foods/get-all.handler';
import { NoRecordAvailable } from './use-cases/update/update-food.handler';

@Resolver(() => FoodObjectType)
export class FoodResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [FoodObjectType], {
    name: 'getAllFoods',
  })
  async getAllFoods(): Promise<FoodObjectType[]> {
    const result = await this.queryBus.execute<
      GetAllFoodCommand,
      Result<Food[], GetAllFoodErrorResponse>
    >(new GetAllFoodCommand());

    return result
      .map((foodArray) => {
        return foodArray.map((food) => mapDomainEntityToGqlObjectType(food));
      })
      .unwrap();
  }

  @Mutation(() => FoodObjectType, {
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
        () => {
          return new InternalServerErrorException();
        },
      )
      .unwrap();
  }

  @Mutation(() => Number, {
    name: 'deleteFoods',
    description: 'Removes foods given an array of ids.',
  })
  async deleteFoods(@Args('input') input: DeleteFoodInput): Promise<any> {
    const result = await this.commandBus.execute<
      DeleteFoodCommand,
      Result<number, FoodDeleteErrorResponse>
    >(new DeleteFoodCommand(input.ids));

    return result
      .map((food) => {
        return food;
      })
      .unwrap();
  }

  @Mutation(() => FoodObjectType, {
    name: 'updateFood',
    description: 'Removes foods given an array of ids.',
  })
  async updateFoods(@Args('input') input: UpdateFoodInput): Promise<any> {
    const result = await this.commandBus.execute<
      UpdateFoodCommand,
      Result<Food>
    >(
      new UpdateFoodCommand(
        input.id,
        input.name,
        input.calories,
        input.protein,
        input.carbs || null,
        input.fats || null,
      ),
    );

    return result
      .map(
        (food) => food,
        (err) => {
          if (err instanceof NoRecordAvailable) {
            return new NotFoundException(
              "The food item you're trying to update does not exist.",
            );
          }
        },
      )
      .unwrap();
  }
}
