import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateCategoryInput {
  @Field(() => String, {})
  @IsNotEmpty()
  name: string

  @Field(() => String, {})
  @IsNotEmpty()
  description: string
}
