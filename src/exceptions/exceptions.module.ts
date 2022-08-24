import { Global, Module } from '@nestjs/common';
import { ExceptionService } from './bad-request-exception/exception.service';







@Global()
@Module({
  providers: [ExceptionService],
  exports: [ExceptionService]
})
export class ExceptionsModule {}
