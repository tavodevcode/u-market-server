import { Module, forwardRef } from '@nestjs/common'
import { SubscriptionPackagesService } from './subscription-packages.service'
import { SubscriptionPackagesResolver } from './subscription-packages.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionPackage } from './entities/subscription-package.entity'
import { PackageBenefitsModule } from 'src/package-benefits/package-benefits.module'

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPackage]), forwardRef(() => PackageBenefitsModule)],
  providers: [SubscriptionPackagesResolver, SubscriptionPackagesService],
  exports: [SubscriptionPackagesService]
})
export class SubscriptionPackagesModule {}
