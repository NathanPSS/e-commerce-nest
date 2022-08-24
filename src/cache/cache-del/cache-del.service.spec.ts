import { Test, TestingModule } from '@nestjs/testing';
import { CacheDelService } from './cache-del.service';

describe('CacheDelService', () => {
  let service: CacheDelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheDelService],
    }).compile();

    service = module.get<CacheDelService>(CacheDelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
