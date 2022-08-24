import { Test, TestingModule } from '@nestjs/testing';
import { CompareHashDataService } from './compare-hash-data.service';

describe('CompareHashDataService', () => {
  let service: CompareHashDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompareHashDataService],
    }).compile();

    service = module.get<CompareHashDataService>(CompareHashDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
