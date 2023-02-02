import { ICommand } from '@nestjs/cqrs';

export abstract class FoodMutationCommand implements ICommand {
  constructor() {}
}
