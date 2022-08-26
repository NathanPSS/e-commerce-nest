import { Injectable } from '@nestjs/common';
import { RedisKey } from 'ioredis';
import { RedisClient } from '../redis/RedisClient';

@Injectable()
export class CacheDelService extends RedisClient{
    async del(key :RedisKey,keys ?:Array<RedisKey>) :Promise<void>{
        if(keys){
        await this.client.del(keys)
        }else {
        await this.client.del(key)
        }
    }
}
