import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPackagesResolver } from './subscription-packages.resolver';
import { SubscriptionPackagesService } from './subscription-packages.service';

describe('SubscriptionPackagesResolver', () => {
  let resolver: SubscriptionPackagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionPackagesResolver, SubscriptionPackagesService],
    }).compile();

    resolver = module.get<SubscriptionPackagesResolver>(SubscriptionPackagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
