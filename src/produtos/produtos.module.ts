import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { ExceptionsModule } from 'src/exceptions/exceptions.module';
import ValidateProduto from './validators/ValidateProduto.service';

@Module({
  imports: [ClientsModule,ExceptionsModule],
  controllers: [ProdutosController],
  providers: [ProdutosService,ValidateProduto],
  exports: [ValidateProduto,ProdutosService]
})
export class ProdutosModule {}
