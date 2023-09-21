import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { SubscriptionPackage } from 'src/subscription-packages/entities/subscription-package.entity'

@Entity()
@ObjectType()
export class PackageBenefit {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({
    length: 125
  })
  @Field()
  description: string

  // @Column('uuid')
  // @Field()
  // subscription_package_id: string
  // @ManyToOne(() => SubscriptionPackage, subscriptionPackage => subscriptionPackage.benefits)

  @ManyToMany(() => SubscriptionPackage, subscriptionPackage => subscriptionPackage.benefits)
  @JoinTable({
    joinColumn: {
      name: 'package_benefit_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'subscription_package_id',
      referencedColumnName: 'id'
    }
  })
  @Field(() => [SubscriptionPackage], { nullable: true })
  packages: SubscriptionPackage[]
}
