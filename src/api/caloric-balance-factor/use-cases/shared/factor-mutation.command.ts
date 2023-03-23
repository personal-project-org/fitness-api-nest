import { ICommand } from '@nestjs/cqrs';

export abstract class CaloricBalanceFactorMutationCommand implements ICommand {
  constructor() {}
}
