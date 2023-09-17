import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { UserGender } from 'src/interfaces/User.interface'

registerEnumType(UserGender, {
  name: 'UserGender'
})
@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({
    length: 50
  })
  @Field()
  name: string

  @Column({
    length: 100
  })
  @Field()
  lastname: string

  @Column({
    length: 250
    // unique: true
  })
  @Field()
  email: string

  @Column({
    length: 100
  })
  @Field()
  password: string

  @Column({
    length: 10,
    nullable: true
  })
  @Field({
    nullable: true
  })
  phone: string

  @Column({
    type: 'enum',
    enum: UserGender,
    nullable: true
  })
  @Field(() => UserGender, { nullable: true })
  gender: UserGender

  @Column({
    length: 3,
    nullable: true
  })
  @Field({
    nullable: true
  })
  age: string
}
