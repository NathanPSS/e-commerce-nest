import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from 'src/clients/clients.module';
import { ExceptionsModule } from 'src/exceptions/exceptions.module';
import { HashModule } from 'src/hash/hash.module';
import { ClientesModule } from '../clientes.module';
import { CheckClienteAuthenticationGuard } from './guards/check-authencation.guard';
import { LocalClienteStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/session.serializer';



@Module({
  imports: [HashModule,ClientsModule,ClientesModule,ExceptionsModule,JwtModule.register({
  }),PassportModule],
  controllers: [],
  providers: [LocalClienteStrategy,CheckClienteAuthenticationGuard,SessionSerializer]
  
})
export class AuthClientesModule {}
