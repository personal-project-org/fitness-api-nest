import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FoodObjectType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  calories: string;

  @Field()
  protein: string;

  @Field()
  carbs: string;

  @Field()
  fats: string;
}
