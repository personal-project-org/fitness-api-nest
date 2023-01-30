import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateFoodInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  calories: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  protein: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  carbs: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  fats: string;
}
