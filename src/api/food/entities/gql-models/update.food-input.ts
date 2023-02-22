import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateFoodInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

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
