import { FoodMutationCommand } from '../shared/food-mutation.command';

export class FoodAddCommand extends FoodMutationCommand {
  constructor(
    public readonly name: string,
    public readonly calories: string,
    public readonly protein: string,
    public readonly carbs: string,
    public readonly fats: string,
  ) {
    super();
  }
}
