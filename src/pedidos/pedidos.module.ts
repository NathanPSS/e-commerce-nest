import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';

import { ClientsModule } from 'src/clients/clients.module';
import { ProdutosModule } from 'src/produtos/produtos.module';
import { CacheModuleLocal } from 'src/cache/cache.module';

@Module({
  imports: [ClientsModule,ProdutosModule,CacheModuleLocal],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService]
})
export class PedidosModule {}
