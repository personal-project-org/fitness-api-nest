import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteSetInput {
  @Field((_type) => [String])
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
