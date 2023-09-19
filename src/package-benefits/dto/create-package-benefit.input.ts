import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class CreatePackageBenefitInput {
  @IsString()
  @Field()
  description: string

  @IsString()
  @IsUUID()
  @Field()
  subscription_package_id: string
}
