import { Test, TestingModule } from '@nestjs/testing';
import { ApiClientesController } from './api-clientes.controller';

describe('ApiClientesController', () => {
  let controller: ApiClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiClientesController],
    }).compile();

    controller = module.get<ApiClientesController>(ApiClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
