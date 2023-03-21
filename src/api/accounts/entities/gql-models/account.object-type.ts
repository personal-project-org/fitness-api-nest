import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountObjectType {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  calorie_goal?: number;

  @Field({ nullable: true })
  protein_goal?: number;

  @Field({ nullable: true })
  carb_goal?: number;

  @Field({ nullable: true })
  fat_goal?: number;
}
