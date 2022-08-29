import { Test, TestingModule } from '@nestjs/testing';
import { ApiProdutosController } from './api-produtos.controller';

describe('ApiProdutosController', () => {
  let controller: ApiProdutosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiProdutosController],
    }).compile();

    controller = module.get<ApiProdutosController>(ApiProdutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
