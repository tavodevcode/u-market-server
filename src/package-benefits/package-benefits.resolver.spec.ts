import { Test, TestingModule } from '@nestjs/testing';
import { PackageBenefitsResolver } from './package-benefits.resolver';
import { PackageBenefitsService } from './package-benefits.service';

describe('PackageBenefitsResolver', () => {
  let resolver: PackageBenefitsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageBenefitsResolver, PackageBenefitsService],
    }).compile();

    resolver = module.get<PackageBenefitsResolver>(PackageBenefitsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
