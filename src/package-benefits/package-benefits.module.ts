import { Module, forwardRef } from '@nestjs/common'
import { PackageBenefitsService } from './package-benefits.service'
import { PackageBenefitsResolver } from './package-benefits.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PackageBenefit } from './entities/package-benefit.entity'
import { SubscriptionPackagesModule } from 'src/subscription-packages/subscription-packages.module'

@Module({
  imports: [TypeOrmModule.forFeature([PackageBenefit]), forwardRef(() => SubscriptionPackagesModule)],
  providers: [PackageBenefitsResolver, PackageBenefitsService],
  exports: [PackageBenefitsService]
})
export class PackageBenefitsModule {}
