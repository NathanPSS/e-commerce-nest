import { Test, TestingModule } from '@nestjs/testing';
import { CacheSetService } from './cache-set.service';

describe('CacheSetService', () => {
  let service: CacheSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheSetService],
    }).compile();

    service = module.get<CacheSetService>(CacheSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
