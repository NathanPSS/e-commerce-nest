import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { HashModule } from 'src/hash/hash.module';
import { PedidosModule } from 'src/pedidos/pedidos.module';
import { ExceptionsModule } from 'src/exceptions/exceptions.module';
import { ProdutosModule } from 'src/produtos/produtos.module';






@Module({
  imports: [ClientsModule,HashModule,PedidosModule,ExceptionsModule,ProdutosModule],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService]
})
export class ClientesModule {}
