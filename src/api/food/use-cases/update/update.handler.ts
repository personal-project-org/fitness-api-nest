import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  FoodRepository,
  FoodUpdateRequestData,
} from 'src/api/food/repository/food.repository';
import { RepositoryCreationError } from '../create/create-food.handler';
import { UpdateFoodCommand } from './update.command';

@CommandHandler(UpdateFoodCommand)
export class UpdateFoodHandler implements ICommandHandler<UpdateFoodCommand> {
  constructor(private readonly foodRepository: FoodRepository) {}
  async execute(command: UpdateFoodCommand): Promise<any> {
    const foodUpdateResult = await this.foodRepository.update({
      id: command.id,
      name: command.name,
      calories: command.calories,
      protein: command.protein,
      carbs: command.carbs,
      fats: command.fats,
    } as FoodUpdateRequestData);

    return foodUpdateResult.map(
      (updatedFood) => updatedFood,
      () => new RepositoryUpdateError(),
    );
  }
}

export abstract class FoodUpdateErrorResponse extends Error {}

export class RepositoryUpdateError extends FoodUpdateErrorResponse {}
