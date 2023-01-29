import { Result } from '@badrap/result'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FoodAddInput } from './models/food-add.input';
import { FoodObjectType } from './models/food.object-type';
import { FoodAddCommand } from 'src/use-case/food/add/food-add.command';
import { Food } from 'src/core/food/food.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Resolver((_of) => FoodObjectType)
export class FoodResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // @Mutation((_returns) => FoodObjectType, {
  //   name: 'addFood',
  //   description: 'Logs a new food.',
  // })
  // async addFood(@Args('input') input: FoodAddInput): Promise<FoodObjectType> {
  //   const result = await this.commandBus.execute<
  //     FoodAddCommand,
  //     Result<Food, SurveyPatchErrorResponse>
  //   >(
  //     new FoodAddCommand(
  //       input.name,
  //       input.calories,
  //       input.protein,
  //       input.carbs || null,
  //       input.fats || null,
  //     ),
  //   );
  // }
}
