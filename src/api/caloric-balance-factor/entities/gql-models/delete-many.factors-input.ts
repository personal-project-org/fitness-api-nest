import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { BalanceFactorType } from '../local-model/factor.entity';

@InputType()
export class DeleteCaloricBalanceFactorsInput {
  @Field((_type) => String)
  @IsArray()
  accountId: string;

  @Field((_type) => [String], { nullable: true })
  @IsArray()
  id: string[];

  @Field({ nullable: true })
  @ValidateIf((input) => input.endingWith == undefined)
  @IsDate()
  startingFrom: Date;

  @Field({ nullable: true })
  @ValidateIf((input) => input.startingFrom == undefined)
  @IsDate()
  endingWith: Date;

  @Field({ nullable: true })
  @IsEnum(BalanceFactorType)
  @IsNotEmpty()
  balanceFactorType: string;
}
