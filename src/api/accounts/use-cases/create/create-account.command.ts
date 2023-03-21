import { AccountMutationCommand } from '../shared/account-mutation.command';

export class CreateAccountCommand extends AccountMutationCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly calorie_goal?: number,
    public readonly protein_goal?: number,
    public readonly carb_goal?: number,
    public readonly fat_goal?: number,
  ) {
    super();
  }
}
