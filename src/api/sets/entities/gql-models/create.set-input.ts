import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

@InputType()
export class CreateSetInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  reps: number;

  @Field((_type) => Number, { nullable: true })
  @ValidateIf((input) => input.weight !== undefined)
  @IsNumber()
  weight: number;

  @Field()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  exerciseId: string;
}
