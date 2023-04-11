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
export class GetCaloricBalanceFactorsInput {
  @Field((_type) => String)
  @IsString()
  accountId: string;

  @Field()
  @IsDate()
  date?: Date;
}
