import { ExerciseMutationCommand } from '../shared/exercise-mutation.command';

export class UpdateExerciseCommand extends ExerciseMutationCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly body_part: string,
    public readonly reps: number[],
    public readonly weight: number[],
  ) {
    super();
  }
}
