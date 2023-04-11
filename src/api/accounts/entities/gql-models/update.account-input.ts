import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

@InputType()
export class UpdateAccountInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  @ValidateIf((input) => input.username !== undefined)
  @IsString()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => String, { nullable: true })
  @ValidateIf((input) => input.new_password !== undefined)
  @Field()
  @IsString()
  new_password: string;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.calorie_goal !== undefined)
  @IsNumber()
  calorie_goal?: number;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.protein_goal !== undefined)
  @IsNumber()
  protein_goal?: number;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.carb_goal !== undefined)
  @IsNumber()
  carb_goal?: number;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.fat_goal !== undefined)
  @IsNumber()
  fat_goal?: number;
}
