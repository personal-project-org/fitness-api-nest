import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountObjectType {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  calorie_goal: number | undefined;

  @Field()
  protein_goal: number | undefined;

  @Field()
  carb_goal: number | undefined;

  @Field()
  fat_goal: number | undefined;
}
