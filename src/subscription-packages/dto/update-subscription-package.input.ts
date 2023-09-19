import { IsNotEmpty, IsUUID } from 'class-validator'
import { CreateSubscriptionPackageInput } from './create-subscription-package.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSubscriptionPackageInput extends PartialType(CreateSubscriptionPackageInput) {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string
}
