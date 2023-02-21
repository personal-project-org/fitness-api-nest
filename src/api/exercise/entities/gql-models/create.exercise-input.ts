import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

@InputType()
export class CreateExerciseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  body_part: string;

  @Field()
  @IsArray()
  @IsNotEmpty()
  reps: Number[];

  @Field()
  @IsArray()
  @IsNotEmpty()
  weight: Number[];
}
