import { SetMutationCommand } from '../../shared/set-mutation.command';

export class UpdateSetCommand extends SetMutationCommand {
  constructor(
    public readonly id: string,
    public readonly reps: number,
    public readonly weight: number,
    public readonly date: Date,
    public readonly exerciseId: string,
  ) {
    super();
  }
}
