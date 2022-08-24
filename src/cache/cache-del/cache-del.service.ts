import { Injectable } from '@nestjs/common';
import { RedisKey } from 'ioredis';
import { RedisClient } from '../redis/RedisClient';

@Injectable()
export class CacheDelService extends RedisClient{
    async del(keys ?:Array<RedisKey>) :Promise<number>{
       const deletions =  await this.client.del(keys)
       return deletions
    }
}
