import { AccountMutationCommand } from '../shared/account-mutation.command';

export class DeleteAccountCommand extends AccountMutationCommand {
  constructor(public readonly id: string, public readonly password: string) {
    super();
  }
}
