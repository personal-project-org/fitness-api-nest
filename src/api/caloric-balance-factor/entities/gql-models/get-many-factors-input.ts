import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { BalanceFactorType } from '../local-model/factor.entity';

@InputType()
export class GetManyCaloricBalanceFactorsInput {
  @Field(() => String)
  @IsArray()
  accountId: string;

  @Field(() => String, { nullable: true })
  @IsArray()
  exerciseId?: string;

  @Field({ nullable: true })
  @ValidateIf((input) => input.endingWith == undefined)
  @IsDate()
  startingFrom?: Date;

  @Field({ nullable: true })
  @ValidateIf((input) => input.startingFrom == undefined)
  @IsDate()
  endingWith?: Date;

  @Field({ nullable: true })
  @IsEnum(BalanceFactorType)
  @IsNotEmpty()
  balanceFactorType?: string;
}
