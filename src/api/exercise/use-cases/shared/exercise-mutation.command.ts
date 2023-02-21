import { ICommand } from '@nestjs/cqrs';

export abstract class ExerciseMutationCommand implements ICommand {
  constructor() {}
}
