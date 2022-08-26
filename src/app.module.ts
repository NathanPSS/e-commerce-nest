import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { PedidosModule } from './pedidos/pedidos.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { HashModule } from './hash/hash.module';
import { CacheModuleLocal } from './cache/cache.module';
import { AuthClientesModule } from './clientes/auth/authClientes.module';
import { AdminModule } from './admin/admin.module';
import { AuthAdminModule } from './admin/auth-admin/auth-admin.module';
import { HomeController } from './home.controller';









@Module({
  imports: [
  PedidosModule, 
  ClientesModule, 
  ProdutosModule, 
  ClientsModule,
  ConfigModule.forRoot({isGlobal: true}),
  HashModule,
  CacheModuleLocal,
  AuthClientesModule,
  AuthAdminModule,
  AdminModule,
],
  controllers: [HomeController],
  providers: [],
})
export class AppModule{

}
