import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { ClientsModule } from 'src/clients/clients.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [ClientsModule,HashModule],
  exports: [AdminService]
})
export class AdminModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    
  }
}
