import { CaloricBalanceFactorMutationCommand } from '../shared/factor-mutation.command';

export class DeleteCaloricBalanceFactorCommand extends CaloricBalanceFactorMutationCommand {
  constructor(
    public readonly accountId: string,
    public readonly ids: string[],
  ) {
    super();
  }
}
