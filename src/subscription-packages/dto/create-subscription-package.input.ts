import { InputType, Field, Float } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { SubscriptionDuration } from 'src/interfaces/Subscription-package.interface'
import { PackageBenefit } from 'src/package-benefits/entities/package-benefit.entity'

@InputType()
export class CreateSubscriptionPackageInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Field()
  name: string

  @IsNotEmpty()
  @IsNumber()
  // @MinLength(1)
  // @MaxLength(10)
  @Field(() => Float)
  price: number

  // TODO: Check if this is needed
  // @IsNotEmpty()
  // @Field(() => SubscriptionDuration)
  // duration: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(250)
  @Field()
  description: string

  @IsOptional()
  @Field(() => [String], { nullable: true, defaultValue: [] })
  benefits?: string[]
}
