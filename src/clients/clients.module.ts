import { Module } from '@nestjs/common';
import { PostgreSqlService } from './postgree-service/postgree-service.service';



@Module({
  providers: [PostgreSqlService],
  exports: [PostgreSqlService],
  controllers: []
})
export class ClientsModule {}
