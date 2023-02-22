import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsArray } from 'class-validator';

@InputType()
export class DeleteExercisesInput {
  @Field((_type) => [String])
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
