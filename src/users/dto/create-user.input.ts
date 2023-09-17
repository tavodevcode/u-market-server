import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, IsNumberString, MaxLength, MinLength, Length } from 'class-validator'
import { UserGender } from 'src/interfaces/User.interface'

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Field()
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  @Field()
  lastname: string

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(250)
  @Field()
  email: string

  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(100)
  @Field()
  password: string

  @IsOptional()
  @IsNumberString()
  @Length(10)
  @Field({
    nullable: true
  })
  phone?: string

  @IsOptional()
  @IsEnum(UserGender, { always: false })
  @Field(() => UserGender, { nullable: true })
  gender?: UserGender

  @IsOptional()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(3)
  @Field({
    nullable: true
  })
  age?: string
}
