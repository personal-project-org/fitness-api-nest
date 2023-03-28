import { CaloricBalanceFactorQueryCommand } from '../shared/factor-query.command';

export class GetCaloricBalanceFactorsCommand extends CaloricBalanceFactorQueryCommand {
  constructor(public readonly accountId: string, public readonly date: Date) {
    super();
  }
}
