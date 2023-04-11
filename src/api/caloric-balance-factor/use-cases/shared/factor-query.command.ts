import { IQuery } from '@nestjs/cqrs';

export abstract class CaloricBalanceFactorQueryCommand implements IQuery {
  constructor() {}
}
