import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

@InputType()
export class UpdateAccountInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field()
  @ValidateIf((input) => input.username !== undefined)
  @IsString()
  username: string;

  //TODO::: Temporary workaround, pre pw validation
  @Field((_type) => String, { nullable: true })
  @ValidateIf((input) => input.password !== undefined)
  @IsString()
  password: string;

  @Field((_type) => Number, { nullable: true })
  @ValidateIf((input) => input.calorie_goal !== undefined)
  @IsNumber()
  calorie_goal: number;

  @Field((_type) => Number, { nullable: true })
  @ValidateIf((input) => input.protein_goal !== undefined)
  @IsNumber()
  protein_goal: number;

  @Field((_type) => Number, { nullable: true })
  @ValidateIf((input) => input.carb_goal !== undefined)
  @IsNumber()
  carb_goal: number;

  @Field((_type) => Number, { nullable: true })
  @ValidateIf((input) => input.fat_goal !== undefined)
  @IsNumber()
  fat_goal: number;
}
