import { Test, TestingModule } from '@nestjs/testing';
import { CacheNormalizeService } from './cache-normalize.service';

describe('CacheNormalizeService', () => {
  let service: CacheNormalizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheNormalizeService],
    }).compile();

    service = module.get<CacheNormalizeService>(CacheNormalizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
