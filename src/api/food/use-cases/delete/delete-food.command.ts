import { FoodMutationCommand } from '../shared/food-mutation.command';

export class DeleteFoodCommand extends FoodMutationCommand {
  constructor(public readonly ids: string[]) {
    super();
  }
}
