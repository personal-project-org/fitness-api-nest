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
  calorie_goal?: number;

  @Field()
  protein_goal?: number;

  @Field()
  carb_goal?: number;

  @Field()
  fat_goal?: number;
}
