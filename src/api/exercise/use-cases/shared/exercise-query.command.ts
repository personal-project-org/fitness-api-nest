import { IQuery } from '@nestjs/cqrs';

export abstract class ExerciseQueryCommand implements IQuery {
  constructor() {}
}
