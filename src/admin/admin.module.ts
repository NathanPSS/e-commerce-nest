import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { ClientesModule } from '../clientes/clientes.module';
import { HashModule } from '../hash/hash.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [HashModule,ClientsModule],
  exports: [AdminService]
})
export class AdminModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    
  }
}
