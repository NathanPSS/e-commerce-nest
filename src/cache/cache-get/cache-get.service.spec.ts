import { Test, TestingModule } from '@nestjs/testing';
import { CacheGetService } from './cache-get.service';

describe('CacheGetService', () => {
  let service: CacheGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheGetService],
    }).compile();

    service = module.get<CacheGetService>(CacheGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
