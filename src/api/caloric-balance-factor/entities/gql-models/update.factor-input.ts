import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { BalanceFactorType } from '../local-model/factor.entity';

@InputType()
export class UpdateFactorInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @Field()
  @IsString()
  exerciseId: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field()
  @IsEnum(BalanceFactorType)
  @IsNotEmpty()
  balanceFactorType: string;

  @Field()
  @IsInt()
  @IsNotEmpty()
  caloriesBurned: number;

  @Field()
  @IsInt()
  @IsNotEmpty()
  caloriesConsumed: number;

  @Field()
  @IsInt()
  @IsNotEmpty()
  protein: number;

  @Field()
  @IsInt()
  @IsNotEmpty()
  carbs: number;

  @Field()
  @IsInt()
  @IsNotEmpty()
  fat: number;
}
