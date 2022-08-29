import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { ExceptionsModule } from 'src/exceptions/exceptions.module';
import ValidateProduto from './validators/ValidateProduto.service';
import { CacheModuleLocal } from 'src/cache/cache.module';
import { AdminModule } from 'src/admin/admin.module';
import { ApiProdutosController } from './controller/api-produtos/api-produtos.controller';

@Module({
  imports: [ClientsModule,ExceptionsModule,CacheModuleLocal,AdminModule],
  controllers: [ProdutosController, ApiProdutosController],
  providers: [ProdutosService,ValidateProduto],
  exports: [ValidateProduto,ProdutosService]
})
export class ProdutosModule {}
