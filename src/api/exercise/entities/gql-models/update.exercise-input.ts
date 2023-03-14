import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

@InputType()
export class UpdateExerciseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

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
}
