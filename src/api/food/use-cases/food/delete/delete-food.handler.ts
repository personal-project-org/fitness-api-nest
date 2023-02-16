import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FoodRepository } from '../../../repository/food.repository';
import { DeleteFoodCommand } from './delete-food.command';

@CommandHandler(DeleteFoodCommand)
export class DeleteFoodHandler implements ICommandHandler<DeleteFoodCommand> {
  constructor(private readonly foodRepository: FoodRepository) {}
  async execute(command: DeleteFoodCommand): Promise<any> {
    const foodDeleteResult = await this.foodRepository.deleteMany(command.ids);
    return foodDeleteResult.map(
      (deletedCount) => deletedCount,
      () => new RepositoryDeleteError(),
    );
  }
}

export abstract class FoodDeleteErrorResponse extends Error {}

export class RepositoryDeleteError extends FoodDeleteErrorResponse {}
