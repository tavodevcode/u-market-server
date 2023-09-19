import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { CreatePackageBenefitInput } from './dto/create-package-benefit.input'
import { UpdatePackageBenefitInput } from './dto/update-package-benefit.input'
import { InjectRepository } from '@nestjs/typeorm'
import { PackageBenefit } from './entities/package-benefit.entity'
import { In, Repository } from 'typeorm'
import { SubscriptionPackagesService } from 'src/subscription-packages/subscription-packages.service'
import { SubscriptionPackage } from 'src/subscription-packages/entities/subscription-package.entity'

@Injectable()
export class PackageBenefitsService {
  constructor(
    @InjectRepository(PackageBenefit) private packageBenefitRepository: Repository<PackageBenefit>,
    @Inject(forwardRef(() => SubscriptionPackagesService)) private subscriptionPackagesService: SubscriptionPackagesService
  ) {}

  async create(createPackageBenefitInput: CreatePackageBenefitInput): Promise<PackageBenefit> {
    return await this.packageBenefitRepository.save(createPackageBenefitInput)
  }

  async packageBenefits(): Promise<PackageBenefit[]> {
    return await this.packageBenefitRepository.find({
      relations: {
        packages: true
      }
    })
  }

  async packageBenefitById(id: string): Promise<PackageBenefit> {
    return await this.packageBenefitRepository.findOneBy({ id })
  }

  async packageBenefitsByFields(benefits: PackageBenefit[]): Promise<PackageBenefit[]> {
    return await this.packageBenefitRepository.findBy(benefits)
  }

  async packageBenefitsByIds(ids: string[]): Promise<PackageBenefit[]> {
    return await this.packageBenefitRepository.findBy({
      id: In(ids)
    })
  }

  update(id: number, updatePackageBenefitInput: UpdatePackageBenefitInput) {
    return `This action updates a #${id} packageBenefit`
  }

  remove(id: number) {
    return `This action removes a #${id} packageBenefit`
  }

  async package(packages: SubscriptionPackage[]): Promise<SubscriptionPackage[]> {
    return await this.subscriptionPackagesService.subscriptionPackagesById(packages)
  }
}
