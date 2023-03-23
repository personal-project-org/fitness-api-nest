import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { BalanceFactorType } from '../local-model/factor.entity';

@InputType()
export class CreateCaloricBalanceFactor {
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

  //For if a food or exercise is deleted
  //   @Field()
  //   @IsJSON()
  //   foodDetails: JSON;

  //   @Field()
  //   @IsJSON()
  //   exerciseDetails: JSON;
}
