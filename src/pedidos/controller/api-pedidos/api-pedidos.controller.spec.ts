import { Test, TestingModule } from '@nestjs/testing';
import { ApiPedidosController } from './api-pedidos.controller';

describe('ApiPedidosController', () => {
  let controller: ApiPedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiPedidosController],
    }).compile();

    controller = module.get<ApiPedidosController>(ApiPedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
