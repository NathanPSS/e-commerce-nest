import { Module } from '@nestjs/common';
import { HashDataService } from './hash-data/hash-data.service';
import { CompareHashDataService } from './compare-hash-data/compare-hash-data.service';

@Module({
  providers: [HashDataService, CompareHashDataService],
  exports: [HashDataService,CompareHashDataService]
})
export class HashModule {}



