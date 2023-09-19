import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql'
import { PackageBenefitsService } from './package-benefits.service'
import { PackageBenefit } from './entities/package-benefit.entity'
import { CreatePackageBenefitInput } from './dto/create-package-benefit.input'
import { UpdatePackageBenefitInput } from './dto/update-package-benefit.input'
import { SubscriptionPackage } from 'src/subscription-packages/entities/subscription-package.entity'

@Resolver(() => PackageBenefit)
export class PackageBenefitsResolver {
  constructor(private readonly packageBenefitsService: PackageBenefitsService) {}

  @Mutation(() => PackageBenefit)
  createPackageBenefit(@Args('createPackageBenefitInput') createPackageBenefitInput: CreatePackageBenefitInput): Promise<PackageBenefit> {
    return this.packageBenefitsService.create(createPackageBenefitInput)
  }

  @Query(() => [PackageBenefit], { name: 'packageBenefits' })
  packageBenefits() {
    return this.packageBenefitsService.packageBenefits()
  }

  @Query(() => PackageBenefit, { name: 'packageBenefit' })
  packageBenefit(@Args('id') id: string) {
    return this.packageBenefitsService.packageBenefitById(id)
  }

  @Mutation(() => PackageBenefit)
  updatePackageBenefit(@Args('updatePackageBenefitInput') updatePackageBenefitInput: UpdatePackageBenefitInput) {
    return this.packageBenefitsService.update(updatePackageBenefitInput.id, updatePackageBenefitInput)
  }

  @Mutation(() => PackageBenefit)
  removePackageBenefit(@Args('id', { type: () => Int }) id: number) {
    return this.packageBenefitsService.remove(id)
  }

  @ResolveField()
  async packages(@Parent() packageBenefit: PackageBenefit): Promise<SubscriptionPackage[]> {
    return await this.packageBenefitsService.package(packageBenefit.packages)
  }
}
