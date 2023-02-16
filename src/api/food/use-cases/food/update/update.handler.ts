import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FoodRepository } from 'src/api/food/repository/food.repository';
import { UpdateFoodCommand } from './update.command';

@CommandHandler(UpdateFoodCommand)
export class UpdateFoodHandler implements ICommandHandler<UpdateFoodCommand> {
  constructor(private readonly foodRepository: FoodRepository) {}
  execute(command: UpdateFoodCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
