import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  FoodRepository,
  FoodUpdateRequestData,
} from '../../repository/food.repository';
import { UpdateFoodCommand } from './update-food.command';
import { Result } from '@badrap/result';

@CommandHandler(UpdateFoodCommand)
export class UpdateFoodHandler implements ICommandHandler<UpdateFoodCommand> {
  constructor(private readonly foodRepository: FoodRepository) {}
  async execute(command: UpdateFoodCommand): Promise<any> {
    const desiredFoodToUpdate = await this.foodRepository.findById(command.id);

    if (desiredFoodToUpdate.isErr) {
      return Result.err(new NoRecordAvailable());
    }

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

export class NoRecordAvailable extends FoodUpdateErrorResponse {}
