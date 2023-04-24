import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';

@InputType()
export class GetCaloricBalanceFactorsInput {
  @Field(() => String)
  @IsString()
  accountId: string;

  @Field()
  @IsDate()
  date?: Date;
}
