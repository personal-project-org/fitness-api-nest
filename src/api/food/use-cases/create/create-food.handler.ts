import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  FoodCreateRequest,
  FoodRepository,
} from '../../repository/food.repository';
import { CreateFoodCommand } from './create-food.command';

@CommandHandler(CreateFoodCommand)
export class CreateFoodHandler implements ICommandHandler<CreateFoodCommand> {
  constructor(private readonly foodRepository: FoodRepository) {}

  async execute(command: CreateFoodCommand): Promise<any> {
    const foodCreateResult = await this.foodRepository.create({
      name: command.name,
      calories: command.calories,
      protein: command.protein,
      carbs: command.carbs,
      fats: command.fats,
    } as FoodCreateRequest);

    return foodCreateResult.map(
      (createdFood) => createdFood,
      () => new RepositoryCreationError(),
    );
  }
}

export abstract class FoodCreateErrorResponse extends Error {}

export class RepositoryCreationError extends FoodCreateErrorResponse {}
