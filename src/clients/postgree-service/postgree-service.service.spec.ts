import { Test, TestingModule } from '@nestjs/testing';
import { PostgreeServiceService } from './postgree-service.service';

describe('PostgreeServiceService', () => {
  let service: PostgreeServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgreeServiceService],
    }).compile();

    service = module.get<PostgreeServiceService>(PostgreeServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
