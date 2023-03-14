import { SetMutationCommand } from '../../shared/set-mutation.command';

export class DeleteSetCommand extends SetMutationCommand {
  constructor(public readonly ids: string[]) {
    super();
  }
}
