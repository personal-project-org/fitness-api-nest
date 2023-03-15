import { ICommand } from '@nestjs/cqrs';

export abstract class SetMutationCommand implements ICommand {
  constructor() {}
}
