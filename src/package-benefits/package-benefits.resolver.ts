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
  async createPackageBenefit(@Args('createPackageBenefitInput') createPackageBenefitInput: CreatePackageBenefitInput): Promise<PackageBenefit> {
    return this.packageBenefitsService.create(createPackageBenefitInput)
  }

  @Query(() => [PackageBenefit], { name: 'packageBenefits' })
  async packageBenefits(): Promise<PackageBenefit[]> {
    return this.packageBenefitsService.packageBenefits()
    // const packageBenefits = await this.packageBenefitsService.packageBenefits()

    // console.log('>>>packageBenefits', packageBenefits)
    // return packageBenefits
  }

  @Query(() => PackageBenefit, { name: 'packageBenefit' })
  async packageBenefit(@Args('id') id: string): Promise<PackageBenefit> {
    return await this.packageBenefitsService.packageBenefitById(id)
  }

  @Mutation(() => PackageBenefit)
  async updatePackageBenefit(@Args('updatePackageBenefitInput') updatePackageBenefitInput: UpdatePackageBenefitInput): Promise<PackageBenefit> {
    return this.packageBenefitsService.update(updatePackageBenefitInput.id, updatePackageBenefitInput)
  }

  @Mutation(() => Boolean)
  async removePackageBenefit(@Args('id') id: string): Promise<boolean> {
    return this.packageBenefitsService.remove(id)
  }

  @ResolveField()
  async packages(@Parent() packageBenefit: PackageBenefit): Promise<SubscriptionPackage[]> {
    // console.log('>>>[packageBenefit]', packageBenefit)
    return await this.packageBenefitsService.packages(packageBenefit.packages)
  }
}
