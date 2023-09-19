import { ObjectType, Field, Int, Float, registerEnumType } from '@nestjs/graphql'
import { PackageBenefit } from 'src/package-benefits/entities/package-benefit.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm'

// import { SubscriptionDuration } from 'src/interfaces/Subscription-package.interface' TODO: Check if this is needed
// registerEnumType(SubscriptionDuration, {
//   name: 'SubscriptionDuration'
// })

@Entity()
@ObjectType()
export class SubscriptionPackage {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({
    length: 50
  })
  @Field()
  name: string

  @Column({
    type: 'float'
  })
  @Field(() => Float)
  price: number

  // @Column({
  //   type: 'enum',
  //   enum: SubscriptionDuration
  // })
  // @Field(() => SubscriptionDuration)
  // duration: string

  @Column({
    length: 250
  })
  @Field()
  description: string

  @ManyToMany(() => PackageBenefit, benefit => benefit.packages)
  @Field(() => [PackageBenefit], { nullable: true })
  benefits: PackageBenefit[]
}
