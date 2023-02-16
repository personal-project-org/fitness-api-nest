import { IQuery } from '@nestjs/cqrs';

export abstract class FoodQueryCommand implements IQuery {
  constructor() {}
}
