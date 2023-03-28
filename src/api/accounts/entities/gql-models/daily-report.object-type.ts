import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DailyReportObjectType {
  @Field()
  username: string;

  @Field()
  accountId: string;

  @Field()
  date: Date;

  @Field()
  caloriesBurned: number;

  @Field()
  caloriesConsumed: number;

  @Field()
  calorieTotal: number;

  @Field()
  totalProtein: number;

  @Field()
  totalCarbs: number;

  @Field()
  totalFat: number;
}
