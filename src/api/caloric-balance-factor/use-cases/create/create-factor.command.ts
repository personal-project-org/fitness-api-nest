import { CaloricBalanceFactorMutationCommand } from '../shared/factor-mutation.command';

export class CreateCaloricBalanceFactorCommand extends CaloricBalanceFactorMutationCommand {
  constructor(
    public readonly accountId: string,
    public readonly date: Date,
    public readonly balanceFactorType: string,
    public readonly exerciseId?: string,
    public readonly caloriesBurned?: number,
    public readonly caloriesConsumed?: number,
    public readonly protein?: number,
    public readonly carbs?: number,
    public readonly fat?: number,
  ) {
    super();
  }
}
