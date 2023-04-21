import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteFoodInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
