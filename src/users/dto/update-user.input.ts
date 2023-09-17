import { InputType, Field, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string
}
