import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteSetInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
