import { CommandBus } from '@nestjs/cqrs';
import { Resolver } from '@nestjs/graphql';
import { ExerciseObjectType } from './entities/gql-models/exercise.object-type';

@Resolver((_of) => ExerciseObjectType)
export class ExerciseResolver {
  constructor(private readonly commandBus: CommandBus) {}
}
