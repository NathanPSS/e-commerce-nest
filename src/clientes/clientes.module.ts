import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { ClientsModule } from '../clients/clients.module';
import { HashModule } from '../hash/hash.module';
import { PedidosModule } from '../pedidos/pedidos.module'
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { ApiClientesController } from './controllers/api-clientes/api-clientes.controller';






@Module({
  imports: [ClientsModule,PedidosModule,HashModule,ExceptionsModule,ProdutosModule],
  controllers: [ClientesController, ApiClientesController],
  providers: [ClientesService],
  exports: [ClientesService]
})
export class ClientesModule {}
