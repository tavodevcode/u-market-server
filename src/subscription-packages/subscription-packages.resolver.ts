import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { SubscriptionPackagesService } from './subscription-packages.service'
import { SubscriptionPackage } from './entities/subscription-package.entity'
import { CreateSubscriptionPackageInput } from './dto/create-subscription-package.input'
import { UpdateSubscriptionPackageInput } from './dto/update-subscription-package.input'

@Resolver(() => SubscriptionPackage)
export class SubscriptionPackagesResolver {
  constructor(private readonly subscriptionPackagesService: SubscriptionPackagesService) {}

  @Mutation(() => SubscriptionPackage)
  async createSubscriptionPackage(@Args('createSubscriptionPackageInput') createSubscriptionPackageInput: CreateSubscriptionPackageInput) {
    return await this.subscriptionPackagesService.create(createSubscriptionPackageInput)
  }

  @Query(() => [SubscriptionPackage], { name: 'subscriptionPackages' })
  async subscriptionPackages(): Promise<SubscriptionPackage[]> {
    return this.subscriptionPackagesService.subscriptionPackages()
  }

  @Query(() => SubscriptionPackage, { name: 'subscriptionPackage' })
  async subscriptionPackage(@Args('id') id: string) {
    return await this.subscriptionPackagesService.subscriptionPackageById(id)
  }

  @Mutation(() => SubscriptionPackage)
  async updateSubscriptionPackage(@Args('updateSubscriptionPackageInput') updateSubscriptionPackageInput: UpdateSubscriptionPackageInput) {
    return await this.subscriptionPackagesService.update(updateSubscriptionPackageInput.id, updateSubscriptionPackageInput)
  }

  @Mutation(() => Boolean)
  async removeSubscriptionPackage(@Args('id') id: string): Promise<boolean> {
    return await this.subscriptionPackagesService.remove(id)
  }

  @ResolveField()
  async benefits(@Parent() subscriptionPackage: SubscriptionPackage) {
    return await this.subscriptionPackagesService.benefits(subscriptionPackage.benefits)
  }
}
