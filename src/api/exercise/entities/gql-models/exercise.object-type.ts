import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExerciseObjectType {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  type: string;
  @Field()
  body_part: string;
  @Field()
  reps: Number[];
  @Field()
  weight: Number[];
}
