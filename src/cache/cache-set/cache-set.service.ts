import { Injectable } from '@nestjs/common';
import type { RedisKey,RedisValue } from 'ioredis';
import { CacheGetService } from '../cache-get/cache-get.service';
import { RedisClient } from '../redis/RedisClient';
import type { RedisTTL } from '../types/RedisTypes';


@Injectable()
export class CacheSetService extends RedisClient{
    constructor(
        private cacheGet :CacheGetService
    ){ super() }
    async set(key :RedisKey, value :RedisValue, ttl :RedisTTL = 7200){
        const cache = await this.exitsCache(key)
        value = value + ';'
        if(cache){
            value = cache+value
          }
          await this.client.set(key,value,'EX',ttl)
    }

    async exitsCache(key :RedisKey) :Promise<string>{
         const cache = await this.cacheGet.get(key)
         return cache
    }
}
