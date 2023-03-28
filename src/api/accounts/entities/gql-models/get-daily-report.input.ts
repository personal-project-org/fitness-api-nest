import { InputType, Field } from '@nestjs/graphql';
import {
  IsDate,
  ValidateIf,
  IsNumber,
  IsNotEmpty,
  IsString,
} from 'class-validator';

@InputType()
export class GetDailyReportInput {
  @Field()
  @IsDate()
  date: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  accountId: string;
}
