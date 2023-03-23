import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';
import { BalanceFactorType } from '../local-model/factor.entity';

@InputType()
export class UpdateCaloricBalanceFactorInput {
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsString()
  exerciseId?: string;

  @Field({ nullable: true })
  @IsDate()
  date?: Date;

  @Field({ nullable: true })
  @IsEnum(BalanceFactorType)
  balanceFactorType?: string;

  @Field({ nullable: true })
  @IsInt()
  caloriesBurned?: number;

  @Field({ nullable: true })
  @IsInt()
  caloriesConsumed?: number;

  @Field({ nullable: true })
  @IsInt()
  protein?: number;

  @Field({ nullable: true })
  @IsInt()
  carbs?: number;

  @Field({ nullable: true })
  @IsInt()
  fat?: number;
}
