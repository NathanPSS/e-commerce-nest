import { Module } from '@nestjs/common';
import { HashModule } from '../../hash/hash.module';
import { AdminModule } from '../admin.module';
import { AuthAdminController } from './auth-admin.controller';
import { LocalAdminStrategy } from './utils/LocalAdminStrategy';

@Module({
  controllers: [AuthAdminController],
  providers: [LocalAdminStrategy],
  imports: [AdminModule,HashModule]
})
export class AuthAdminModule {}
