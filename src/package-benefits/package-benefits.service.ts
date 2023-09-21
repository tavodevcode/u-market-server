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
    const { packages, ...resCreatePackageBenefitInput } = createPackageBenefitInput

    return await this.packageBenefitRepository.save({
      ...resCreatePackageBenefitInput,
      packages: packages && (await this.subscriptionPackagesService.subscriptionPackagesByIds(packages))
    })
  }

  async packageBenefits(): Promise<PackageBenefit[]> {
    return await this.packageBenefitRepository.find({
      relations: {
        packages: {
          benefits: true
        }
      }
    })
  }

  async packageBenefitById(id: string): Promise<PackageBenefit> {
    return await this.packageBenefitRepository.findOne({
      where: { id },
      relations: {
        packages: {
          benefits: true
        }
      }
    })
  }

  async packageBenefitsByFields(benefits: PackageBenefit[]): Promise<PackageBenefit[]> {
    return await this.packageBenefitRepository.findBy(benefits)
  }

  async packageBenefitsByIds(ids: string[]): Promise<PackageBenefit[]> {
    return await this.packageBenefitRepository.find({
      where: { id: In(ids) },
      relations: {
        packages: {
          benefits: true
        }
      }
    })
  }

  async update(id: string, updatePackageBenefitInput: UpdatePackageBenefitInput): Promise<PackageBenefit> {
    const { packages, ...resUpdatePackageBenefitInput } = updatePackageBenefitInput

    const packageBenefit = await this.packageBenefitRepository.findOneBy({ id })

    this.packageBenefitRepository.merge(packageBenefit, {
      ...resUpdatePackageBenefitInput,
      packages: packages && (await this.subscriptionPackagesService.subscriptionPackagesByIds(packages))
    })

    return await this.packageBenefitRepository.save(packageBenefit)
  }

  async remove(id: string): Promise<boolean> {
    const packageBenefit = await this.packageBenefitRepository.findOneBy({ id })

    if (!packageBenefit) return false

    await this.packageBenefitRepository.remove(packageBenefit)
    return true
  }

  async packages(packages: SubscriptionPackage[]): Promise<SubscriptionPackage[]> {
    return await this.subscriptionPackagesService.subscriptionPackagesByIds(packages.map(p => p.id))
  }
}
