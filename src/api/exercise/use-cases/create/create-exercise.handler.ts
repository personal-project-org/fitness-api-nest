import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateExerciseCommand)
export class CreateExerciseCommand
  implements ICommandHandler<CreateExerciseCommand>
{
  execute(command: CreateExerciseCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
