import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteFoodInput {
  @Field((_type) => [String])
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
