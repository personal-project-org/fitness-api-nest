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
  @Field((_type) => [Number])
  reps: number[];
  @Field((_type) => [Number])
  weight: number[];
}
