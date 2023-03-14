import { SetMutationCommand } from '../../shared/set-mutation.command';

export class CreateSetCommand extends SetMutationCommand {
  constructor(
    public readonly reps: number,
    public readonly weight: number,
    public readonly date: Date,
    public readonly exerciseId: string,
  ) {
    super();
  }
}
