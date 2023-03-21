import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateAccountInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsInt()
  calorie_goal: number;

  @Field()
  @IsInt()
  protein_goal: number;

  @Field()
  @IsInt()
  carb_goal: number;

  @Field()
  @IsInt()
  fat_goal: number;
}
