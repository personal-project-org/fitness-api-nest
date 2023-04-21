import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { BalanceFactorType } from '../local-model/factor.entity';

@InputType()
export class CreateCaloricBalanceFactorInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @Field(() => String, { nullable: true })
  @ValidateIf((input) => input.exerciseId == undefined)
  @IsString()
  exerciseId?: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field()
  @IsEnum(BalanceFactorType)
  @IsNotEmpty()
  balanceFactorType: string;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.caloriesBurned !== undefined)
  @IsInt()
  @IsNotEmpty()
  caloriesBurned?: number;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.caloriesConsumed !== undefined)
  @IsInt()
  @IsNotEmpty()
  caloriesConsumed?: number;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.protein !== undefined)
  @IsInt()
  @IsNotEmpty()
  protein?: number;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.carbs !== undefined)
  @IsInt()
  @IsNotEmpty()
  carbs?: number;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.fat !== undefined)
  @IsInt()
  @IsNotEmpty()
  fat: number;
}
