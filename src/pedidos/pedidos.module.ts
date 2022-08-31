import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';


import { ProdutosModule } from '../produtos/produtos.module';
import { CacheModuleLocal } from '../cache/cache.module';
import { ApiPedidosController } from './controller/api-pedidos/api-pedidos.controller';
import { ClientsModule } from '../clients/clients.module';
import ValidateProduto from '../produtos/validators/ValidateProduto.service';


@Module({
  imports: [CacheModuleLocal,ClientsModule],
  controllers: [ApiPedidosController],
  providers: [PedidosService,ValidateProduto],
  exports: [PedidosService]
})
export class PedidosModule {}
