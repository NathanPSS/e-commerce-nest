import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { ClientesModule } from '../clientes/clientes.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import ValidateProduto from './validators/ValidateProduto.service';
import { CacheModuleLocal } from '../cache/cache.module';
import { AdminModule } from '../admin/admin.module';
import { ApiProdutosController } from './controller/api-produtos/api-produtos.controller';
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service'
@Module({
  imports: [ExceptionsModule,CacheModuleLocal,AdminModule],
  controllers: [ProdutosController, ApiProdutosController],
  providers: [ProdutosService,ValidateProduto,PostgreSqlService],
  exports: [ValidateProduto,ProdutosService]
})
export class ProdutosModule {}
