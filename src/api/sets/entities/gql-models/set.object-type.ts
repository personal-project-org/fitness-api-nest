import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SetObjectType {
  @Field()
  id: string;

  @Field()
  reps: number;

  @Field()
  weight: number;

  @Field()
  date: Date;

  @Field()
  exerciseId: string;
}
