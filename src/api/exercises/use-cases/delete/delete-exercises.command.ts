import { ExerciseMutationCommand } from '../shared/exercise-mutation.command';

export class DeleteExerciseCommand extends ExerciseMutationCommand {
  constructor(public readonly ids: string[]) {
    super();
  }
}
