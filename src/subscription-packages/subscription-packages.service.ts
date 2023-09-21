import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { CreateSubscriptionPackageInput } from './dto/create-subscription-package.input'
import { UpdateSubscriptionPackageInput } from './dto/update-subscription-package.input'
import { InjectRepository } from '@nestjs/typeorm'
import { SubscriptionPackage } from './entities/subscription-package.entity'
import { In, Repository } from 'typeorm'
import { PackageBenefitsService } from 'src/package-benefits/package-benefits.service'
import { PackageBenefit } from 'src/package-benefits/entities/package-benefit.entity'

@Injectable()
export class SubscriptionPackagesService {
  constructor(
    @InjectRepository(SubscriptionPackage) private subscriptionPackageRepository: Repository<SubscriptionPackage>,
    @Inject(forwardRef(() => PackageBenefitsService)) private packageBenefitsService: PackageBenefitsService
  ) {}

  async create(createSubscriptionPackageInput: CreateSubscriptionPackageInput): Promise<SubscriptionPackage> {
    const { benefits, ...resCreateSubscriptionPackageInput } = createSubscriptionPackageInput

    return await this.subscriptionPackageRepository.save({
      ...resCreateSubscriptionPackageInput,
      benefits: benefits && (await this.packageBenefitsService.packageBenefitsByIds(benefits))
    })
  }

  async subscriptionPackages(): Promise<SubscriptionPackage[]> {
    return await this.subscriptionPackageRepository.find({
      relations: {
        benefits: {
          packages: true
        }
      }
    })
  }

  async subscriptionPackageById(id: string): Promise<SubscriptionPackage> {
    return await this.subscriptionPackageRepository.findOne({
      where: { id },
      relations: {
        benefits: {
          packages: true
        }
      }
    })
  }

  async subscriptionPackagesByFields(subscriptionPackage: SubscriptionPackage[]): Promise<SubscriptionPackage[]> {
    return await this.subscriptionPackageRepository.findBy(subscriptionPackage)
  }

  async subscriptionPackagesByIds(id: string[]): Promise<SubscriptionPackage[]> {
    return await this.subscriptionPackageRepository.find({
      where: {
        id: In(id)
      },
      relations: {
        benefits: {
          packages: true
        }
      }
    })
  }

  async update(id: string, updateSubscriptionPackageInput: UpdateSubscriptionPackageInput): Promise<SubscriptionPackage> {
    const { benefits, ...resUpdateSubscriptionPackageInput } = updateSubscriptionPackageInput

    const subscriptionPackage = await this.subscriptionPackageRepository.findOneBy({ id })
    this.subscriptionPackageRepository.merge(subscriptionPackage, {
      ...resUpdateSubscriptionPackageInput,
      benefits: benefits && (await this.packageBenefitsService.packageBenefitsByIds(benefits))
    })

    return await this.subscriptionPackageRepository.save(subscriptionPackage)
  }

  async remove(id: string): Promise<boolean> {
    const subscriptionPackage = await this.subscriptionPackageRepository.findOneBy({ id })

    if (!subscriptionPackage) return false

    await this.subscriptionPackageRepository.remove(subscriptionPackage)
    return true
  }

  async benefits(benefits: PackageBenefit[]) {
    return await this.packageBenefitsService.packageBenefitsByIds(benefits.map(benefit => benefit.id))
  }
}
