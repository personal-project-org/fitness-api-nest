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

  @Field({ nullable: true })
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

  @Field({ nullable: true })
  @IsInt()
  @IsNotEmpty()
  caloriesBurned: number;

  @Field({ nullable: true })
  @IsInt()
  @IsNotEmpty()
  caloriesConsumed: number;

  @Field({ nullable: true })
  @IsInt()
  @IsNotEmpty()
  protein: number;

  @Field({ nullable: true })
  @IsInt()
  @IsNotEmpty()
  carbs: number;

  @Field({ nullable: true })
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
