import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';


import { ClientsModule } from 'src/clients/clients.module';
import { ProdutosModule } from 'src/produtos/produtos.module';
import { CacheModuleLocal } from 'src/cache/cache.module';
import { ApiPedidosController } from './controller/api-pedidos/api-pedidos.controller';


@Module({
  imports: [ClientsModule,ProdutosModule,CacheModuleLocal],
  controllers: [ApiPedidosController],
  providers: [PedidosService],
  exports: [PedidosService]
})
export class PedidosModule {}
