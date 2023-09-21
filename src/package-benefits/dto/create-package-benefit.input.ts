import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreatePackageBenefitInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(125)
  @Field()
  description: string

  @IsOptional()
  @Field(() => [String], { nullable: true, defaultValue: [] })
  packages?: string[]
}
