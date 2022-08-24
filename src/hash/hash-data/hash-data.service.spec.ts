import { Test, TestingModule } from '@nestjs/testing';
import { HashDataService } from './hash-data.service';

describe('HashDataService', () => {
  let service: HashDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashDataService],
    }).compile();

    service = module.get<HashDataService>(HashDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
