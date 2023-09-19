import { Test, TestingModule } from '@nestjs/testing';
import { PackageBenefitsService } from './package-benefits.service';

describe('PackageBenefitsService', () => {
  let service: PackageBenefitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageBenefitsService],
    }).compile();

    service = module.get<PackageBenefitsService>(PackageBenefitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
