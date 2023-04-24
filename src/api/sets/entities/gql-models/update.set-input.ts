import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

@InputType()
export class UpdateSetInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.reps !== undefined)
  @IsNumber()
  @IsNotEmpty()
  reps: number;

  @Field(() => Number, { nullable: true })
  @ValidateIf((input) => input.weight !== undefined)
  @IsNumber()
  weight: number;

  @Field(() => Date, { nullable: true })
  @ValidateIf((input) => input.date !== undefined)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field()
  @ValidateIf((input) => input.exerciseId !== undefined)
  @IsString()
  @IsNotEmpty()
  exerciseId: string;
}
