import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteFoodInput {
  @Field((_type) => String)
  @IsString()
  @IsNotEmpty()
  ids: string;
}
