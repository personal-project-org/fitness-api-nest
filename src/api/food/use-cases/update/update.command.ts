import { FoodMutationCommand } from '../shared/food-mutation.command';

export class UpdateFoodCommand extends FoodMutationCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly calories: string,
    public readonly protein: string,
    public readonly carbs: string,
    public readonly fats: string,
  ) {
    super();
  }
}
