import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

@InputType()
export class CreateExerciseInput {
  @Field((_type) => [String])
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
