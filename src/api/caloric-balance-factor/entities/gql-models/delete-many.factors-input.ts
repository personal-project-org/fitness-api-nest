import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BalanceFactorType } from '../local-model/factor.entity';

@InputType()
export class DeleteFactorsInput {
  @Field((_type) => String)
  @IsArray()
  accountId: string;

  @Field((_type) => [String])
  @IsArray()
  id: string[];

  @Field()
  @IsDate()
  startingFrom: Date;

  @Field()
  @IsDate()
  endingWith: Date;

  @Field()
  @IsEnum(BalanceFactorType)
  @IsNotEmpty()
  balanceFactorType: string;
}
