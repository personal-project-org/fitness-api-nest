import { ExerciseMutationCommand } from '../shared/exercise-mutation.command';

export class CreateExerciseCommand extends ExerciseMutationCommand {
  constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly body_part: string,
  ) {
    super();
  }
}
