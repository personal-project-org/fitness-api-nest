import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetDailyReportInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @Field()
  @IsDate()
  date: Date;
}
