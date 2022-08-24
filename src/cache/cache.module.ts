import { Module } from '@nestjs/common';
import { CacheGetService } from './cache-get/cache-get.service';
import { CacheDelService } from './cache-del/cache-del.service';
import { CacheSetService } from './cache-set/cache-set.service';
import { CacheNormalizeService } from './cache-normalize/cache-normalize.service';



@Module({
  imports: [],
  providers: [CacheGetService, CacheDelService, CacheSetService, CacheNormalizeService],
  exports: [CacheDelService,CacheGetService,CacheSetService,CacheNormalizeService]
})
export class CacheModuleLocal {}
