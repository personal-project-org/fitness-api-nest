import { IQuery } from '@nestjs/cqrs';

export abstract class SetQueryCommand implements IQuery {
  constructor() {}
}
