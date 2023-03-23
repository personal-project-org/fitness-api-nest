import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CaloricBalanceFactorObjectType {
  @Field()
  id: string;

  @Field()
  accountId: string;

  @Field({ nullable: true })
  exerciseId: string;

  @Field()
  date: Date;

  @Field()
  balanceFactorType: string;

  @Field({ nullable: true })
  caloriesBurned: number;

  @Field({ nullable: true })
  caloriesConsumed: number;

  @Field({ nullable: true })
  protein: number;

  @Field({ nullable: true })
  carbs: number;

  @Field({ nullable: true })
  fat: number;
}
